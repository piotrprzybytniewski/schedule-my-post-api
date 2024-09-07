import { Mocked, TestBed } from '@suites/unit';
import { PostWasPublished } from 'src/post/domain/event/post-was-published.event';
import { PostAggregate } from 'src/post/domain/post.aggregate';
import {
  POST_REPOSITORY,
  PostRepositoryPort,
} from 'src/post/domain/post.repository.port';
import { PostContent } from 'src/post/domain/value-object/post-content.vo';
import { PostCreatorId } from 'src/post/domain/value-object/post-creator-id.vo';
import { PostTitle } from 'src/post/domain/value-object/post-title.vo';
import {
  USER_REPOSITORY,
  UserRepositoryPort,
} from 'src/user/domain/user.repository.port';
import {
  PLATFORM_PUBLISHING_SERVICE,
  PlatformPublishingPort,
} from '../port/platform-publishing.port';
import { PostWasPublishedHandler } from './post-was-published.handler';

describe('PostWasPublishedHandler', () => {
  let handler: PostWasPublishedHandler;
  let postRepository: Mocked<PostRepositoryPort>;
  let userRepository: Mocked<UserRepositoryPort>;
  let publishingPlatform: Mocked<PlatformPublishingPort>;

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.solitary(
      PostWasPublishedHandler,
    ).compile();

    handler = unit;
    postRepository = unitRef.get(POST_REPOSITORY);
    userRepository = unitRef.get(USER_REPOSITORY);
    publishingPlatform = unitRef.get(PLATFORM_PUBLISHING_SERVICE);
  });

  it('should publish post from PostWasPublished event to Publishing Platform', async () => {
    const event = new PostWasPublished('123');

    postRepository.findOneById.mockResolvedValue(
      PostAggregate.create(
        {
          title: new PostTitle({ value: 'This is a valid post title' }),
          content: new PostContent({
            value: 'This is a valid post content',
          }),
          creatorId: new PostCreatorId({
            value: '12345',
          }),
          flairs: null,
          nsfw: false,
          schedules: [],
        },
        '123',
      ),
    );

    userRepository.findRefreshTokenByUserId.mockResolvedValue('12345');

    publishingPlatform.publish.mockResolvedValue('54321');

    const res = await handler.handle(event);

    expect(publishingPlatform.publish).toHaveBeenCalledTimes(1);
    expect(publishingPlatform.publish).toHaveBeenCalledWith(
      '123',
      'This is a valid post title',
      'This is a valid post content',
      'apitestsandbox',
      false,
      '12345',
    );

    expect(res).toBeUndefined();
  });

  it('should throw error when post is not found', async () => {
    const event = new PostWasPublished('123');

    postRepository.findOneById.mockResolvedValue(null);

    expect(handler.handle(event)).rejects.toThrow('Post not found');
  });

  it('should throw error when refresh token is not found', async () => {
    const event = new PostWasPublished('123');
    const post = PostAggregate.create(
      {
        title: new PostTitle({ value: 'This is a valid post title' }),
        content: new PostContent({
          value: 'This is a valid post content',
        }),
        creatorId: new PostCreatorId({
          value: '12345',
        }),
        flairs: null,
        nsfw: false,
        schedules: [],
      },
      '123',
    );

    postRepository.findOneById.mockResolvedValue(post);
    userRepository.findRefreshTokenByUserId.mockResolvedValue(null);

    expect(handler.handle(event)).rejects.toThrow(
      'Refresh token not found for user 12345',
    );
    expect(postRepository.save).not.toHaveBeenCalled();
    expect(publishingPlatform.publish).not.toHaveBeenCalled();
  });
});
