import { PostTitleTooLongException } from 'src/core/domain/exception/post-title-too-long.exception';
import { PostWasDrafted } from './event/post-was-drafted.event';
import { PostAggregate } from './post.aggregate';
import { PostContent } from './value-object/post-content.vo';
import { PostCreatorId } from './value-object/post-creator-id.vo';
import { PostTitle } from './value-object/post-title.vo';
import { AllowedPostStatuses, PostStatus } from './value-object/post-status.vo';
import { PostCannotSchedulePublishedPostException } from 'src/core/domain/exception/post-cannot-schedule-published-post.exception';
import { PostCannotRepublishException } from 'src/core/domain/exception/post-cannot-republish.exception';

describe('PostAggregate', () => {
  it('should create a valid Post Aggregate instance with properties', () => {
    const post = PostAggregate.create({
      title: new PostTitle({ value: 'This is a valid post title' }),
      content: new PostContent({ value: 'This is a valid post content' }),
      creatorId: new PostCreatorId({
        value: '12345',
      }),
      flairs: null,
      nsfw: false,
      schedules: [],
    });

    expect(post.title).toEqual('This is a valid post title');
    expect(post.content).toEqual('This is a valid post content');
    expect(post.creatorId).toEqual('12345');
    expect(post.flairs).toEqual(null);
    expect(post.nsfw).toEqual(false);
    expect(post.schedules).toEqual([]);

    expect(post.getUncommittedEvents()).toHaveLength(1);
    expect(post.getUncommittedEvents()[0]).toBeInstanceOf(PostWasDrafted);
  });

  it('should throw error when create a post with invalid, too long title', () => {
    const tooLongTitle = [...Array(301)].map(() => 'a').join('');
    expect(() =>
      PostAggregate.create({
        title: new PostTitle({ value: tooLongTitle }),
        content: new PostContent({ value: 'This is a valid post content' }),
        creatorId: new PostCreatorId({
          value: '12345',
        }),
        flairs: null,
        nsfw: false,
        schedules: [],
      }),
    ).toThrow(PostTitleTooLongException);
  });

  it('should change status to scheduled when schedule post is called', () => {
    const post = PostAggregate.create({
      title: new PostTitle({ value: 'This is a valid post title' }),
      content: new PostContent({ value: 'This is a valid post content' }),
      creatorId: new PostCreatorId({
        value: '12345',
      }),
      flairs: null,
      nsfw: false,
      schedules: [],
    });

    post.schedule();

    expect(post.status.value).toEqual(AllowedPostStatuses.Scheduled);
  });

  it('should change status to published when publish post is called', () => {
    const post = PostAggregate.create({
      title: new PostTitle({ value: 'This is a valid post title' }),
      content: new PostContent({ value: 'This is a valid post content' }),
      creatorId: new PostCreatorId({
        value: '12345',
      }),
      flairs: null,
      nsfw: false,
      schedules: [],
    });

    post.schedule();

    post.publish();

    expect(post.status.value).toEqual(AllowedPostStatuses.Published);
  });

  it('should throw error when schedule a post that is already published', () => {
    const post = PostAggregate.create({
      title: new PostTitle({ value: 'This is a valid post title' }),
      content: new PostContent({ value: 'This is a valid post content' }),
      creatorId: new PostCreatorId({
        value: '12345',
      }),
      flairs: null,
      nsfw: false,
      schedules: [],
    });

    jest
      .spyOn(post, 'status', 'get')
      .mockReturnValue(
        new PostStatus({ value: AllowedPostStatuses.Published }),
      );

    expect(() => post.schedule()).toThrow(
      PostCannotSchedulePublishedPostException,
    );
    expect(post.status.value).toEqual(AllowedPostStatuses.Published);
  });

  it('should throw error when want to publish already published post', () => {
    const post = PostAggregate.create({
      title: new PostTitle({ value: 'This is a valid post title' }),
      content: new PostContent({ value: 'This is a valid post content' }),
      creatorId: new PostCreatorId({
        value: '12345',
      }),
      flairs: null,
      nsfw: false,
      schedules: [],
    });

    jest
      .spyOn(post, 'status', 'get')
      .mockReturnValue(
        new PostStatus({ value: AllowedPostStatuses.Published }),
      );

    expect(() => post.publish()).toThrow(PostCannotRepublishException);
    expect(post.status.value).toEqual(AllowedPostStatuses.Published);
  });
});
