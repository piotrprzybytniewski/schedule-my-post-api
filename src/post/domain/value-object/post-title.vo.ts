import { PostTitleTooLongException } from 'src/core/domain/exception/post-title-too-long.exception';
import { ValueObject } from 'src/core/domain/model/value-object';

interface PostTitleProps {
  value: string;
}

export class PostTitle extends ValueObject<PostTitleProps> {
  protected validate(props: PostTitleProps): void {
    if (props.value.length >= 300) {
      throw new PostTitleTooLongException();
    }
  }

  get value(): string {
    return this.props.value;
  }
}
