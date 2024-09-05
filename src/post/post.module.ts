import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePostHandler } from './application/create-post/create-post.handler';
import { POST_REPOSITORY } from './domain/post.repository.port';
import { PostRepositoryAdapter } from './infrastructure/persistence/post.repository.adapter';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './domain/model/post.model';
import { PostMapper } from './domain/post.mapper';
import { CreatePostController } from './infrastructure/ui/controller/create-post.controller';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
    ]),
  ],
  controllers: [CreatePostController],
  providers: [
    CreatePostHandler,
    {
      provide: POST_REPOSITORY,
      useClass: PostRepositoryAdapter,
    },
    PostMapper,
  ],
  exports: [MongooseModule],
})
export class PostModule {}
