import { BaseEntity } from './entity.base';

export abstract class AggregateRoot<
  EntityProps,
> extends BaseEntity<EntityProps> {}
