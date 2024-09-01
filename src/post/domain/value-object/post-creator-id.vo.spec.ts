import { PostCreatorId } from './post-creator-id.vo';

describe('PostCreatorId', () => {
  it('should create a valid post creator id', () => {
    const postCreatorId = new PostCreatorId({ value: '12345' });

    expect(postCreatorId.value).toEqual('12345');
  });
});
