import { ValueObject } from 'src/core/domain/model/value-object';

export enum AllowedPostStatuses {
  Drafted = 'drafted',
  Scheduled = 'scheduled',
  Published = 'published',
}

interface PostStatusProps {
  value: AllowedPostStatuses;
}

export class PostStatus extends ValueObject<PostStatusProps> {
  protected validate(props: PostStatusProps): void {
    if (!props.value) {
      throw new Error('Post status is required');
    }

    if (!Object.values(AllowedPostStatuses).includes(props.value)) {
      throw new Error(
        `Post status must be one of: ${Object.values(AllowedPostStatuses).join(', ')}`,
      );
    }
  }

  get value(): AllowedPostStatuses {
    return this.props.value;
  }
}
