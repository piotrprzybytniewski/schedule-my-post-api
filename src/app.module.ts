import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    UserModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
