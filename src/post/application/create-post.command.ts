import { ICommand } from '@nestjs/cqrs';

export class CreatePostCommand implements ICommand {
  readonly title: string;
  readonly content: string;
  readonly flairs: string[];
  readonly nsfw: boolean;
  readonly creatorId: string;

  constructor(props: CreatePostCommand) {
    this.title = props.title;
    this.content = props.content;
    this.flairs = props.flairs;
    this.nsfw = props.nsfw;
    this.creatorId = props.creatorId;
  }
}
