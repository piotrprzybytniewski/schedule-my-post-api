import { ValueObject } from 'src/core/domain/model/value-object';

interface PostContentProps {
  value: string;
}

export class PostContent extends ValueObject<PostContentProps> {
  protected validate(props: PostContentProps): void {
    if (props.value.length === 0) {
      throw new Error('Post content cannot be empty');
    }

    if (props.value.length >= 1000) {
      throw new Error('Post content cannot be longer than 1000 characters');
    }
  }

  get value(): string {
    return this.props.value;
  }
}
