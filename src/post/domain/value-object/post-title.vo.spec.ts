import { PostTitleTooLongException } from 'src/core/domain/exception/post-title-too-long.exception';
import { PostTitle } from './post-title.vo';

describe('PostTitle', () => {
  it('should create a valid post title', () => {
    const title = 'This is a valid post title';
    const postTitle = new PostTitle({ value: title });

    expect(postTitle.value).toEqual(title);
  });

  it('should throw an error when post title is longer than 300 characters', () => {
    const tooLongTitle = [...Array(301)].map(() => 'a').join('');
    expect(() => new PostTitle({ value: tooLongTitle })).toThrow(
      PostTitleTooLongException,
    );
  });
});
