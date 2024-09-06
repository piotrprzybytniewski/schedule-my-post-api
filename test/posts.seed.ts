import mongoose from 'mongoose';
import {
  Post,
  PostDocument,
  PostSchema,
} from 'src/post/domain/model/post.model';

export const postSeedData = {
  _id: '1',
  creatorId: 'user1',
  title: 'Post title',
  content: 'Post content',
  flairs: ['test'],
  nsfw: false,
  externalId: 'externalId1',
};

export async function seedInitialPosts(testDbUri: string) {
  const connection = await mongoose.connect(testDbUri);

  const PostModel = connection.model<PostDocument>(Post.name, PostSchema);

  await PostModel.insertMany([postSeedData]);

  await connection.disconnect();
}
