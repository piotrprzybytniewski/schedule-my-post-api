import mongoose from 'mongoose';
import {
  Account,
  AccountDocument,
  AccountSchema,
} from 'src/user/domain/model/account.model';

export const accountSeedData = {
  _id: '1',
  userId: 'user1',
  refreshToken: 'refreshToken1',
};

export async function seedInitialAccounts(dbUri: string) {
  const connection = await mongoose.connect(dbUri);

  const AccountModel = connection.model<AccountDocument>(
    Account.name,
    AccountSchema,
  );

  await AccountModel.insertMany([accountSeedData]);

  await connection.disconnect();
}
