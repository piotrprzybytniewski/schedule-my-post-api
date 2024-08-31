import { AllowedPostStatuses, PostStatus } from './post-status.vo';

describe('PostStatus', () => {
  it('should create a valid drafted Post Status', () => {
    const postStatus = new PostStatus({ value: AllowedPostStatuses.Drafted });
    expect(postStatus.value).toBe(AllowedPostStatuses.Drafted);
  });

  it('should create a valid scheduled Post Status', () => {
    const postStatus = new PostStatus({ value: AllowedPostStatuses.Scheduled });
    expect(postStatus.value).toBe(AllowedPostStatuses.Scheduled);
  });

  it('should create a valid published Post Status', () => {
    const postStatus = new PostStatus({ value: AllowedPostStatuses.Published });
    expect(postStatus.value).toBe(AllowedPostStatuses.Published);
  });
});
