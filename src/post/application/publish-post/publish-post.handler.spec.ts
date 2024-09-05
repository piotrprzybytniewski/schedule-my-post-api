import { Mocked, TestBed } from '@suites/unit';
import { PostAggregate } from 'src/post/domain/post.aggregate';
import { PostContent } from 'src/post/domain/value-object/post-content.vo';
import { PostCreatorId } from 'src/post/domain/value-object/post-creator-id.vo';
import { PostTitle } from 'src/post/domain/value-object/post-title.vo';
import {
  POST_REPOSITORY,
  PostRepositoryPort,
} from '../../domain/post.repository.port';
import {
  AllowedPostStatuses,
  PostStatus,
} from '../../domain/value-object/post-status.vo';
import { PublishPostCommand } from './publish-post.command';
import { PublishPostHandler } from './publish-post.handler';
describe('PublishPostHandler', () => {
  let handler: PublishPostHandler;
  let postRepository: Mocked<PostRepositoryPort>;

  beforeEach(async () => {
    const { unit, unitRef } =
      await TestBed.solitary(PublishPostHandler).compile();
    handler = unit;
    postRepository = unitRef.get(POST_REPOSITORY);
  });

  it('should publish a post', async () => {
    const input: PublishPostCommand = {
      postId: '123',
    };

    const post = PostAggregate.create({
      title: new PostTitle({ value: 'This is a valid post title' }),
      content: new PostContent({ value: 'This is a valid post content' }),
      creatorId: new PostCreatorId({
        value: '12345',
      }),
      flairs: null,
      nsfw: false,
      schedules: [],
    });

    jest
      .spyOn(post, 'status', 'get')
      .mockReturnValue(
        new PostStatus({ value: AllowedPostStatuses.Scheduled }),
      );

    postRepository.findOneById = jest.fn().mockReturnValue(post);

    const result = await handler.execute(input);

    expect(postRepository.save).toHaveBeenCalledTimes(1);
    expect(postRepository.save).toHaveBeenCalledWith(post);

    expect(result).toBeUndefined();
  });

  it('should not publish a post that is not scheduled', async () => {
    const input: PublishPostCommand = {
      postId: '321',
    };

    const post = PostAggregate.create({
      title: new PostTitle({ value: 'This is a valid post title' }),
      content: new PostContent({ value: 'This is a valid post content' }),
      creatorId: new PostCreatorId({
        value: '12345',
      }),
      flairs: null,
      nsfw: false,
      schedules: [],
    });

    postRepository.findOneById = jest.fn().mockReturnValue(post);

    expect(() => handler.execute(input)).rejects.toThrow(
      'Post cannot be republished',
    );

    expect(postRepository.save).toHaveBeenCalledTimes(0);
  });
});
