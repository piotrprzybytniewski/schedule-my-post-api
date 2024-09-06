import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { PostAggregate } from 'src/post/domain/post.aggregate';
import { PostMapper } from 'src/post/domain/post.mapper';
import { POST_REPOSITORY } from 'src/post/domain/post.repository.port';
import { PostContent } from 'src/post/domain/value-object/post-content.vo';
import { PostCreatorId } from 'src/post/domain/value-object/post-creator-id.vo';
import { PostTitle } from 'src/post/domain/value-object/post-title.vo';
import { PostModule } from 'src/post/post.module';
import { createTestingApp } from 'test/e2e.utils';
import { postSeedData, seedInitialPosts } from 'test/posts.seed';
import { PostRepositoryAdapter } from './post.repository.adapter';

describe('PostRepositoryAdapter', () => {
  let app: INestApplication;
  let testDbUri: string;
  let mongoServer: MongoMemoryServer;
  let postRepository: PostRepositoryAdapter;

  beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create();
    testDbUri = mongoServer.getUri();
    await seedInitialPosts(testDbUri);

    app = await createTestingApp({
      imports: [PostModule, MongooseModule.forRoot(testDbUri)],
      providers: [
        {
          provide: POST_REPOSITORY,
          useClass: PostRepositoryAdapter,
        },
        PostMapper,
      ],
    });

    postRepository = app.get(POST_REPOSITORY);
  });

  afterEach(async () => {
    if (app) await app.close();

    if (mongoServer) await mongoServer.stop();
  });

  describe('findAll', () => {
    it('should return all posts', async () => {
      const posts = await postRepository.findAll();

      expect(posts).toHaveLength(1);
      expect(posts[0].creatorId).toEqual(postSeedData.creatorId);
      expect(posts[0].title).toEqual(postSeedData.title);
      expect(posts[0].content).toEqual(postSeedData.content);
      expect(posts[0].nsfw).toEqual(postSeedData.nsfw);
    });
  });

  describe('findOneById', () => {
    it('should return a post by id', async () => {
      const post = await postRepository.findOneById('1');

      expect(post.creatorId).toEqual(postSeedData.creatorId);
      expect(post.title).toEqual(postSeedData.title);
      expect(post.content).toEqual(postSeedData.content);
      expect(post.nsfw).toEqual(postSeedData.nsfw);
      expect(post.flairs.flairs).toEqual(postSeedData.flairs);
      expect(post.externalId).toEqual(postSeedData.externalId);
    });

    it('should return null if post not found', async () => {
      const post = await postRepository.findOneById('2');

      expect(post).toBeNull();
    });
  });

  describe('save', () => {
    it('should save a post', async () => {
      await postRepository.save(
        PostAggregate.create({
          creatorId: new PostCreatorId({ value: 'user1' }),
          title: new PostTitle({ value: 'Post title' }),
          content: new PostContent({ value: 'Post content' }),
          flairs: null,
          nsfw: false,
          schedules: [],
          externalId: null,
        }),
      );

      const posts = await postRepository.findAll();
      expect(posts).toHaveLength(2);
    });
  });
});
