import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
