import { ValueObject } from 'src/core/domain/model/value-object';

interface PostFlairsProps {
  flairs: string[];
}

export class PostFlairs extends ValueObject<PostFlairsProps> {
  protected validate(props: PostFlairsProps): void {
    if (props.flairs.length === 0) {
      throw new Error('Post flairs cannot be empty');
    }

    const uniqueFlairsCheck = [...new Set(props.flairs)];

    if (uniqueFlairsCheck.length !== props.flairs.length) {
      throw new Error('Post flairs cannot have duplicates');
    }
  }

  get flairs(): string[] {
    return this.props.flairs;
  }
}
