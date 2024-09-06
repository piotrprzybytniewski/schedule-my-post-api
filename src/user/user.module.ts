import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './domain/model/account.model';
import { USER_REPOSITORY } from './domain/user.repository.port';
import { UserRepositoryAdapter } from './infrastructure/adapter/user.repository.adapter';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryAdapter,
    },
  ],
  exports: [MongooseModule, USER_REPOSITORY],
})
export class UserModule {}
