import { randomUUID } from 'crypto';
import { AggregateRoot } from 'src/core/domain/model/aggregate-root';
import { AggregateId } from 'src/core/domain/model/entity.base';
import { PostWasDrafted } from './event/post-was-drafted.event';
import { PostWasPublished } from './event/post-was-published.event';
import { PostWasScheduled } from './event/post-was-scheduled.event';
import { CreatePostProps, PostProps } from './post.types';
import { PostFlairs } from './value-object/post-flairs.vo';
import { AllowedPostStatuses, PostStatus } from './value-object/post-status.vo';
import { PostSchedule } from './value-object/post-schedule.vo';
import { PostCannotSchedulePublishedPostException } from 'src/core/domain/exception/post-cannot-schedule-published-post.exception';
import { PostCannotRepublishException } from 'src/core/domain/exception/post-cannot-republish.exception';

export class PostAggregate extends AggregateRoot<PostProps> {
  protected _id: AggregateId;

  static create(
    props: CreatePostProps,
    aggregateId?: AggregateId,
  ): PostAggregate {
    const id = aggregateId || randomUUID();

    const post = new PostAggregate({
      id: id,
      props: {
        ...props,

        status: new PostStatus({ value: AllowedPostStatuses.Drafted }),
      },
    });

    if (!aggregateId) {
      post.apply(new PostWasDrafted(id));
    }

    return post;
  }

  draft(): void {
    this.changeStatus(new PostStatus({ value: AllowedPostStatuses.Drafted }));

    this.apply(new PostWasDrafted(this._id));
  }

  schedule(): void {
    if (this.status.value !== AllowedPostStatuses.Drafted) {
      throw new PostCannotSchedulePublishedPostException();
    }

    this.changeStatus(new PostStatus({ value: AllowedPostStatuses.Scheduled }));

    this.apply(new PostWasScheduled(this._id));
  }

  publish(): void {
    if (this.status.value !== AllowedPostStatuses.Scheduled) {
      throw new PostCannotRepublishException();
    }

    this.changeStatus(new PostStatus({ value: AllowedPostStatuses.Published }));

    this.apply(new PostWasPublished(this._id));
  }

  updatePostExternalId(externalPostId: string): void {
    if (this.props.externalId) throw new Error('External post id already set');

    this.props.externalId = externalPostId;
  }

  private changeStatus(status: PostStatus): void {
    this.props.status = status;
  }

  validate(): void {}

  get title(): string {
    return this.props.title.value;
  }

  get content(): string {
    return this.props.content.value;
  }

  get status(): PostStatus {
    return this.props.status;
  }

  get id(): AggregateId {
    return this._id;
  }

  get creatorId(): string {
    return this.props.creatorId.value;
  }

  get flairs(): PostFlairs | null {
    return this.props.flairs;
  }

  get nsfw(): boolean {
    return this.props.nsfw;
  }

  get schedules(): PostSchedule[] {
    return this.props.schedules;
  }
}
