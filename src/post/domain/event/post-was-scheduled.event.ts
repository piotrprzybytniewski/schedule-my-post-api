import { DomainEvent } from 'src/core/domain/model/domain-event';

export class PostWasScheduled implements DomainEvent {
  constructor(public readonly postId: string) {}
}
