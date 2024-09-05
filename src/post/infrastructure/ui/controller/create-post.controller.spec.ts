import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { PostModule } from 'src/post/post.module';
import request from 'supertest';
import { createTestingApp } from 'test/e2e.utils';

describe('CreatePostController', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const dbUri = mongoServer.getUri();

    app = await createTestingApp({
      imports: [PostModule, MongooseModule.forRoot(dbUri)],
    });
  });

  afterAll(async () => {
    if (app) await app.close();

    if (mongoServer) await mongoServer.stop();
  });

  describe('api/posts (POST)', () => {
    it('should create a new post', () => {
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
  });
});
