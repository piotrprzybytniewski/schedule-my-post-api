import { Injectable } from '@nestjs/common';
import { Mapper } from 'src/core/domain/model/mapper.interface';
import { Post } from './model/post.model';
import { PostAggregate } from './post.aggregate';
import { PostContent } from './value-object/post-content.vo';
import { PostCreatorId } from './value-object/post-creator-id.vo';
import { PostFlairs } from './value-object/post-flairs.vo';
import { PostTitle } from './value-object/post-title.vo';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PostMapper implements Mapper<PostAggregate, Post> {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  toDomain(dbModel: Post): PostAggregate {
    return PostAggregate.create(
      {
        creatorId: new PostCreatorId({ value: dbModel.creatorId }),
        title: new PostTitle({ value: dbModel.title }),
        content: new PostContent({ value: dbModel.content }),
        flairs: dbModel.flairs
          ? new PostFlairs({ flairs: dbModel.flairs })
          : null,
        nsfw: dbModel.nsfw,
        schedules: [],
      },
      dbModel._id,
    );
  }
  toPersistence(domainModel: PostAggregate): Post {
    const post = new this.postModel();
    post.creatorId = domainModel.creatorId;
    post.title = domainModel.title;
    post.content = domainModel.content;
    post.flairs = domainModel.flairs ? domainModel.flairs.flairs : null;
    post.nsfw = domainModel.nsfw;
    post._id = domainModel.id;

    return post;
  }
}
