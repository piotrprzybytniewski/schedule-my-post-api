import { AggregateRoot } from 'src/core/domain/model/aggregate-root';
import { PostProps } from './post.types';
import { AggregateId } from 'src/core/domain/model/entity.base';
import { randomUUID } from 'crypto';
import { AllowedPostStatuses, PostStatus } from './value-object/post-status.vo';
import { PostWasDrafted } from './event/post-was-drafted.event';

export class PostAggregate extends AggregateRoot<PostProps> {
  protected _id: AggregateId;

  static create(props: PostProps, aggregateId?: AggregateId): PostAggregate {
    const id = aggregateId || randomUUID();

    const postProps: PostProps = {
      ...props,
      status: new PostStatus({ value: AllowedPostStatuses.Drafted }),
    };

    const post = new PostAggregate({ id: id, props: postProps });

    if (!aggregateId) {
      post.apply(new PostWasDrafted(id));
    }

    return post;
  }

  public validate(): void {}
}
