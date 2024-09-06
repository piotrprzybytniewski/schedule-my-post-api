import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({
    required: true,
  })
  _id: string;

  @Prop({
    required: true,
  })
  creatorId: string;

  @Prop({
    maxlength: 300,
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  content: string;

  @Prop([String])
  flairs: string[];

  @Prop({
    default: false,
  })
  nsfw: boolean;

  @Prop({
    required: false,
  })
  externalId: string;

  constructor(init?: Partial<Post>) {
    Object.assign(this, init);
  }
}

export const PostSchema = SchemaFactory.createForClass(Post);
