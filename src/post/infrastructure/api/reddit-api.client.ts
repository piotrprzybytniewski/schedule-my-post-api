import { Injectable } from '@nestjs/common';
import Snoowrap from 'snoowrap';
import { PostExternalId } from 'src/post/domain/post.types';

@Injectable()
export class RedditApiClient {
  async submitPost(
    postId: string,
    subredditName: string,
    title: string,
    content: string,
    nsfw: boolean,
    creatorRefreshToken: string,
  ): Promise<PostExternalId> {
    return this.getApiClient(creatorRefreshToken)
      .submitSelfpost({
        title: title,
        text: content,
        subredditName: subredditName,
        nsfw: nsfw,
      })
      .then((res) => {
        return res.id;
      })
      .catch((e) => {
        console.log(`Failed publishing post ${postId} to Reddit: ${e}`);

        throw new Error(`Failed publishing post ${postId} to Reddit: ${e}`);
      });
  }

  getApiClient(refreshToken: string): Snoowrap {
    return new Snoowrap({
      userAgent: process.env.AUTH_REDDIT_AGENT,
      clientId: process.env.AUTH_REDDIT_ID,
      clientSecret: process.env.AUTH_REDDIT_SECRET,
      refreshToken,
    });
  }
}
