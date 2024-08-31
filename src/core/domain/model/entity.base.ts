import { AggregateRoot as BaseAggregateRoot } from '@nestjs/cqrs';
export type AggregateId = string;

export interface BaseEntityProps {
  id: AggregateId;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEntityProps<EntityProps> {
  id: AggregateId;
  createdAt?: Date;
  updatedAt?: Date;
  props: EntityProps;
}

export abstract class BaseEntity<EntityProps> extends BaseAggregateRoot {
  protected abstract _id: AggregateId;
  protected readonly props: EntityProps;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  /**
   * Validates entity on creation to ensure data integrity.
   */
  public abstract validate(): void;

  constructor(props: CreateEntityProps<EntityProps>) {
    super();
    this.setId(props.id);
    this.props = props.props;
    const now = new Date();
    this._createdAt = props.createdAt || now;
    this._updatedAt = props.updatedAt || now;

    this.validate();
  }

  private setId(id: AggregateId) {
    this._id = id;
  }

  get id(): AggregateId {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }
}
