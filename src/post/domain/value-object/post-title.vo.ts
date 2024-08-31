import { ValueObject } from 'src/core/domain/model/value-object';

interface PostTitleProps {
  value: string;
}

export class PostTitle extends ValueObject<PostTitleProps> {
  protected validate(props: PostTitleProps): void {
    if (props.value.length >= 300) {
      throw new Error('Post title cannot be longer than 300 characters');
    }
  }

  get value(): string {
    return this.props.value;
  }
}
