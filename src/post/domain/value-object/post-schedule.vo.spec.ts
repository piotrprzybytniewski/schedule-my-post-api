import { PostSchedule } from './post-schedule.vo';

describe('PostSchedule', () => {
  it('should create a valid post schedule', () => {
    const subredditName = 'r/test';
    const scheduleTime = new Date();
    const postSchedule = new PostSchedule({ subredditName, scheduleTime });

    expect(postSchedule.subredditName).toEqual(subredditName);
    expect(postSchedule.scheduleTime).toEqual(scheduleTime);
  });

  it('should throw an error when subreddit name is empty', () => {
    const emptySubredditName = '';
    const scheduleTime = new Date();
    expect(
      () =>
        new PostSchedule({ subredditName: emptySubredditName, scheduleTime }),
    ).toThrow();
  });

  it('should throw an error when schedule time is in the past', () => {
    const scheduleTime = new Date(0);
    expect(
      () => new PostSchedule({ subredditName: 'r/test', scheduleTime }),
    ).toThrow();
  });

  it('should throw an error when schedule time is empty', () => {
    const scheduleTime = new Date(0);
    expect(
      () => new PostSchedule({ subredditName: 'r/test', scheduleTime }),
    ).toThrow();
  });
});
