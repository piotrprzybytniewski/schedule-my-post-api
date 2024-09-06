import { Injectable } from '@nestjs/common';
import { PlatformPublishingPort } from '../port/platform-publishing.port';
import { PostExternalId } from 'src/post/domain/post.types';
import { RedditApiClient } from '../api/reddit-api.client';

@Injectable()
export class RedditPublishingAdapter implements PlatformPublishingPort {
  constructor(private readonly redditApiClient: RedditApiClient) {}

  async publish(
    postId: string,
    title: string,
    content: string,
    subredditName: string,
    nsfw: boolean,
    creatorRefreshToken: string,
  ): Promise<PostExternalId> {
    return this.redditApiClient.submitPost(
      postId,
      subredditName,
      title,
      content,
      nsfw,
      creatorRefreshToken,
    );
  }
}
