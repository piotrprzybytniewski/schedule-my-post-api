import { ValueObject } from 'src/core/domain/model/value-object';

interface PostCreatorIdProps {
  value: string;
}

export class PostCreatorId extends ValueObject<PostCreatorIdProps> {
  protected validate(props: PostCreatorIdProps): void {
    if (!props.value) {
      throw new Error('Post creator id cannot be empty');
    }
  }

  public get value(): string {
    return this.props.value;
  }
}
