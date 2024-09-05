import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  POST_REPOSITORY,
  PostRepositoryPort,
} from '../../domain/post.repository.port';
import { PublishPostCommand } from './publish-post.command';

@CommandHandler(PublishPostCommand)
export class PublishPostHandler implements ICommandHandler<PublishPostCommand> {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepositoryPort,
  ) {}

  public async execute(command: PublishPostCommand): Promise<void> {
    try {
      const post = await this.postRepository.findOneById(command.postId);

      post.publish();

      await this.postRepository.save(post);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
