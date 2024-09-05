import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from './create-post.command';
import { Inject } from '@nestjs/common';
import {
  POST_REPOSITORY,
  PostRepositoryPort,
} from '../../domain/post.repository.port';
import { PostAggregate } from '../../domain/post.aggregate';
import { PostCreatorId } from '../../domain/value-object/post-creator-id.vo';
import { PostTitle } from '../../domain/value-object/post-title.vo';
import { PostContent } from '../../domain/value-object/post-content.vo';
import { PostFlairs } from '../../domain/value-object/post-flairs.vo';
import { AggregateId } from 'src/core/domain/model/entity.base';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepositoryPort,
  ) {}

  public async execute(command: CreatePostCommand): Promise<AggregateId> {
    const post = PostAggregate.create({
      creatorId: new PostCreatorId({ value: command.creatorId }),
      title: new PostTitle({ value: command.title }),
      content: new PostContent({ value: command.content }),
      flairs: command.flairs
        ? new PostFlairs({ flairs: command.flairs })
        : null,
      nsfw: command.nsfw,
      schedules: [],
    });

    try {
      await this.postRepository.save(post);

      return post.id;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
