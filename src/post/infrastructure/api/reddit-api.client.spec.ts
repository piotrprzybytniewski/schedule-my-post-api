import { Test, TestingModule } from '@nestjs/testing';
import Snoowrap, { SnoowrapOptions } from 'snoowrap';
import { RedditApiClient } from './reddit-api.client';

jest.mock('snoowrap');

describe('RedditApiClient', () => {
  let redditApiClient: RedditApiClient;
  let mockSnoowrapInstance: jest.Mocked<Snoowrap>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedditApiClient],
    }).compile();

    redditApiClient = module.get<RedditApiClient>(RedditApiClient);

    const mockOptions: SnoowrapOptions = {
      userAgent: 'test',
      clientId: 'test',
      clientSecret: 'test',
      refreshToken: 'test',
    };

    mockSnoowrapInstance = new Snoowrap(mockOptions) as jest.Mocked<Snoowrap>;

    // Spy on the getApiClient method and mock its implementation
    jest
      .spyOn(redditApiClient, 'getApiClient')
      .mockReturnValue(mockSnoowrapInstance);
  });

  it('should be defined', () => {
    expect(redditApiClient).toBeDefined();
  });

  describe('submitPost', () => {
    it('should submit a post and return the post ID', async () => {
      const postId = '123';
      const subredditName = 'test';
      const title = 'Test Title';
      const content = 'Test Content';
      const nsfw = false;
      const creatorRefreshToken = 'token';

      mockSnoowrapInstance.submitSelfpost = jest
        .fn()
        .mockResolvedValue({ id: postId });

      const result = await redditApiClient.submitPost(
        postId,
        subredditName,
        title,
        content,
        nsfw,
        creatorRefreshToken,
      );

      expect(result).toBe(postId);
      expect(mockSnoowrapInstance.submitSelfpost).toHaveBeenCalledWith({
        title: title,
        text: content,
        subredditName: subredditName,
        nsfw: nsfw,
      });
    });

    it('should throw an error when submission fails', async () => {
      const postId = '123';
      const subredditName = 'test';
      const title = 'Test Title';
      const content = 'Test Content';
      const nsfw = false;
      const creatorRefreshToken = 'token';

      mockSnoowrapInstance.submitSelfpost = jest
        .fn()
        .mockRejectedValue(new Error('Submission failed'));

      await expect(
        redditApiClient.submitPost(
          postId,
          subredditName,
          title,
          content,
          nsfw,
          creatorRefreshToken,
        ),
      ).rejects.toThrow(
        `Failed publishing post ${postId} to Reddit: Error: Submission failed`,
      );
    });
  });
});
