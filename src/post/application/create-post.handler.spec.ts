import {
  POST_REPOSITORY,
  PostRepositoryPort,
} from '../domain/post.repository.port';
import { AllowedPostStatuses } from '../domain/value-object/post-status.vo';
import { CreatePostCommand } from './create-post.command';
import { CreatePostHandler } from './create-post.handler';
import { Mocked, TestBed } from '@suites/unit';
describe('CreatePostHandler', () => {
  let handler: CreatePostHandler;
  let postRepository: Mocked<PostRepositoryPort>;

  beforeEach(async () => {
    const { unit, unitRef } =
      await TestBed.solitary(CreatePostHandler).compile();
    handler = unit;
    postRepository = unitRef.get(POST_REPOSITORY);
  });

  it('should save a new drafted post', () => {
    const input: CreatePostCommand = {
      id: '123',
      title: 'Test Post',
      content: 'Test content',
      flairs: null,
      nsfw: false,
      creatorId: '123',
    };

    const result = handler.execute(input);

    expect(postRepository.save).toHaveBeenCalledTimes(1);
    expect(postRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        title: input.title,
        content: input.content,
        flairs: input.flairs,
        nsfw: input.nsfw,
        status: expect.objectContaining({
          value: AllowedPostStatuses.Drafted,
        }),
      }),
    );
    expect(result).resolves.toBeUndefined();
  });
});
