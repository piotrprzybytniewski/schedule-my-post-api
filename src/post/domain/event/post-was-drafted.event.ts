import { DomainEvent } from 'src/core/domain/model/domain-event';

export class PostWasDrafted implements DomainEvent {
  constructor(public readonly postId: string) {}
}
