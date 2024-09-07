import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { JwtAuthGuard } from 'src/auth/application/jwt-auth.guard';
import { mainConfig } from 'src/main.config';
import { PostModule } from 'src/post/post.module';
import request from 'supertest';
import { e2eBaseImports } from 'test/e2e.utils';
import { MockAuthGuard } from 'test/mock-auth.guard';

describe('CreatePostController', () => {
  let app: INestApplication;
  let jwtAuthGuard: JwtAuthGuard;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const dbUri = mongoServer.getUri();

    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [PostModule, MongooseModule.forRoot(dbUri), ...e2eBaseImports],
      providers: [JwtAuthGuard],
    }).compile();

    app = testingModule.createNestApplication();

    mainConfig(app);

    await app.init();

    jwtAuthGuard = app.get<JwtAuthGuard>(JwtAuthGuard);
  });

  afterAll(async () => {
    if (app) await app.close();

    if (mongoServer) await mongoServer.stop();
  });

  describe('api/posts (POST)', () => {
    it('should create a new post', () => {
      jest
        .spyOn(jwtAuthGuard, 'canActivate')
        .mockImplementation(new MockAuthGuard().canActivate);

      return request(app.getHttpServer())
        .post('/posts')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
          title: 'Post title',
          content: 'Post content',
          flairs: ['test'],
          nsfw: false,
        })
        .expect((res) => {
          expect(res.body.id).toBeDefined();
          expect(res.body.title).toBeUndefined();
        })
        .expect(201);
    });

    it('should return validation error if title is missing for a post', () => {
      jest
        .spyOn(jwtAuthGuard, 'canActivate')
        .mockImplementation(new MockAuthGuard().canActivate);

      return request(app.getHttpServer())
        .post('/posts')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
          content: 'Post content',
          flairs: ['test'],
          nsfw: false,
        })
        .expect((res) => {
          expect(res.body.message).toBeDefined();
          expect(res.body.error).toBeDefined();
          expect(res.body.statusCode).toBe(400);
        })
        .expect(400);
    });

    it('should throw error when user is not authenticated and try to create a post anonymously', () => {
      jest.spyOn(jwtAuthGuard, 'canActivate').mockResolvedValue(false);

      return request(app.getHttpServer())
        .post('/posts')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({
          title: 'Post title',
          content: 'Post content',
          flairs: ['test'],
          nsfw: false,
        })
        .expect((res) => {
          expect(res.body.message).toBeDefined();
          expect(res.body.error).toBe('Forbidden');
          expect(res.body.statusCode).toBe(403);
          expect(res.body.id).not.toBeDefined();
        })
        .expect(403);
    });
  });
});
