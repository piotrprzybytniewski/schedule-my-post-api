import { PostExternalId } from 'src/post/domain/post.types';

export const PLATFORM_PUBLISHING_SERVICE = Symbol(
  'PLATFORM_PUBLISHING_SERVICE',
);

export interface PlatformPublishingPort {
  publish(
    postId: string,
    title: string,
    content: string,
    subredditName: string,
    nsfw: boolean,
    creatorApiToken: string,
  ): Promise<PostExternalId>;
}
