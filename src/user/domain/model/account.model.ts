import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AccountDocument = HydratedDocument<Account>;

@Schema()
export class Account {
  @Prop({
    required: true,
  })
  _id: string;

  @Prop({
    required: true,
  })
  userId: string;

  @Prop({
    required: true,
  })
  refreshToken: string;

  constructor(init?: Partial<Account>) {
    Object.assign(this, init);
  }
}

export const AccountSchema = SchemaFactory.createForClass(Account);
