import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PostWasPublished } from 'src/post/domain/event/post-was-published.event';
import {
  PLATFORM_PUBLISHING_SERVICE,
  PlatformPublishingPort,
} from '../port/platform-publishing.port';
import { Inject } from '@nestjs/common';
import {
  POST_REPOSITORY,
  PostRepositoryPort,
} from 'src/post/domain/post.repository.port';
import {
  USER_REPOSITORY,
  UserRepositoryPort,
} from 'src/user/domain/user.repository.port';

@EventsHandler(PostWasPublished)
export class PostWasPublishedHandler
  implements IEventHandler<PostWasPublished>
{
  constructor(
    @Inject(PLATFORM_PUBLISHING_SERVICE)
    private readonly platformPublishing: PlatformPublishingPort,
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepositoryPort,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async handle(event: PostWasPublished): Promise<void> {
    try {
      const post = await this.postRepository.findOneById(event.postId);

      const creatorRefreshToken =
        await this.userRepository.findRefreshTokenByUserId(post.creatorId);

      if (!creatorRefreshToken) {
        throw new Error('Refresh token not found for user ' + post.creatorId);
      }

      const externalPostId = await this.platformPublishing.publish(
        post.id,
        post.title,
        post.content,
        // TODO: Use real subreddit name, as loop over post.schedules
        'apitestsandbox',
        post.nsfw,
        creatorRefreshToken,
      );

      post.updatePostExternalId(externalPostId);

      await this.postRepository.save(post);
    } catch (error) {
      console.error('publish post handler error', error);
    }
  }
}
