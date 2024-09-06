import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from 'src/user/domain/model/account.model';
import { UserRepositoryPort } from 'src/user/domain/user.repository.port';

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
  ) {}

  async findRefreshTokenByUserId(userId: string): Promise<string | null> {
    return this.accountModel
      .findOne({ userId })
      .then((account) => account.refreshToken);
  }
}
