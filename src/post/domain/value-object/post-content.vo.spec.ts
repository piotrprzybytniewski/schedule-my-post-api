import { PostContent } from './post-content.vo';

describe('PostContent', () => {
  it('should create a valid post content', () => {
    const content = 'This is a valid post content';
    const postContent = new PostContent({ value: content });

    expect(postContent.value).toEqual(content);
  });

  it('should throw an error when post content is empty', () => {
    const emptyContent = '';
    expect(() => new PostContent({ value: emptyContent })).toThrow();
  });

  it('should throw an error when post content is longer than 1000 characters', () => {
    const tooLongContent = [...Array(1001)].map(() => 'a').join('');
    expect(() => new PostContent({ value: tooLongContent })).toThrow();
  });
});
