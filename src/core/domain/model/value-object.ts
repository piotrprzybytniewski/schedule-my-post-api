interface ValueObjectProps {
  [index: string]: any;
}

export abstract class ValueObject<Props extends ValueObjectProps> {
  protected readonly props: Props;

  constructor(props: Props) {
    this.props = props;
    this.validate(props);
  }

  /**
   * Validate the props of the value object.
   */
  protected abstract validate(props: Props): void;

  /* Check if two Value Objects are equal */
  public equals(other: ValueObject<Props>): boolean {
    if (other === null || other === undefined || other.props === undefined) {
      return false;
    }

    return JSON.stringify(this.props) === JSON.stringify(other.props);
  }
}
