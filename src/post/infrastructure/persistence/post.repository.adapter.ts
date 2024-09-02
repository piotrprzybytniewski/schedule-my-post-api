import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/post/domain/model/post.model';
import { PostAggregate } from 'src/post/domain/post.aggregate';
import { PostMapper } from 'src/post/domain/post.mapper';
import { PostRepositoryPort } from 'src/post/domain/post.repository.port';

@Injectable()
export class PostRepositoryAdapter implements PostRepositoryPort {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    private readonly postMapper: PostMapper,
    private readonly publisher: EventPublisher,
  ) {}

  async findAll(): Promise<PostAggregate[]> {
    return this.postModel
      .find()
      .then((posts) => posts.map((post) => this.postMapper.toDomain(post)));
  }
  async findOneById(id: string): Promise<PostAggregate> {
    return this.postModel.findById(id).then((post) => {
      if (!post) {
        return null;
      }

      return this.postMapper.toDomain(post);
    });
  }
  async save(entity: PostAggregate): Promise<void> {
    this.publisher.mergeObjectContext(entity);

    entity.commit();

    await this.postModel.updateOne(
      { _id: entity.id },
      this.postMapper.toPersistence(entity),
      {
        upsert: true,
      },
    );

    return Promise.resolve();
  }
}
