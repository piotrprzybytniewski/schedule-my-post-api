import { INestApplication, ModuleMetadata } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtAuthGuard } from 'src/auth/application/jwt-auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from 'src/config/config.module';
import { MockAuthGuard } from './mock-auth.guard';
import { mainConfig } from 'src/main.config';
import { UserModule } from 'src/user/user.module';

/**
 * Create a testing app with base configuration
 */
export async function createTestingApp(
  moduleMetadata: ModuleMetadata,
): Promise<INestApplication> {
  const imports = Array.isArray(moduleMetadata.imports)
    ? moduleMetadata.imports
    : [moduleMetadata.imports];

  const testingModule: TestingModule = await Test.createTestingModule({
    ...moduleMetadata,
    imports: [...imports, CqrsModule, ConfigModule, AuthModule, UserModule],
  })
    .overrideProvider(JwtAuthGuard)
    .useClass(MockAuthGuard)
    .compile();
  const app = testingModule.createNestApplication();

  mainConfig(app);

  await app.init();

  return app;
}
