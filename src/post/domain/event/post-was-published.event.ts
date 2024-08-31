import { DomainEvent } from 'src/core/domain/model/domain-event';

export class PostWasPublished implements DomainEvent {
  constructor(public readonly postId: string) {}
}
