import { ModuleMetadata } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from 'src/config/config.module';
import { UserModule } from 'src/user/user.module';

export const e2eBaseImports: ModuleMetadata['imports'] = [
  CqrsModule,
  ConfigModule,
  AuthModule,
  UserModule,
];
