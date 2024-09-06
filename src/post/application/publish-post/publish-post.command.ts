import { ICommand } from '@nestjs/cqrs';

export class PublishPostCommand implements ICommand {
  readonly postId: string;

  constructor(props: PublishPostCommand) {
    this.postId = props.postId;
  }
}
