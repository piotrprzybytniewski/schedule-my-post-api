import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Post } from './model/post.model';
import { PostAggregate } from './post.aggregate';
import { PostMapper } from './post.mapper';
import { PostContent } from './value-object/post-content.vo';
import { PostCreatorId } from './value-object/post-creator-id.vo';
import { PostTitle } from './value-object/post-title.vo';

describe('PostMapper', () => {
  let mapper: PostMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostMapper,
        {
          provide: getModelToken(Post.name),
          useValue: jest.fn(),
        },
      ],
    }).compile();

    mapper = module.get<PostMapper>(PostMapper);
  });

  it('should map a post database model to a post aggregate', () => {
    const dbModel: Post = {
      _id: '123456',
      creatorId: '123',
      title: 'This is a valid post title',
      content: 'This is a valid post content',
      flairs: null,
      nsfw: false,
    };
    const post = mapper.toDomain(dbModel);

    expect(post.id).toEqual('123456');
    expect(post.creatorId).toEqual('123');
    expect(post.title).toEqual('This is a valid post title');
    expect(post.content).toEqual('This is a valid post content');
    expect(post.flairs).toEqual(null);
    expect(post.nsfw).toEqual(false);
  });

  it('should map a post aggregate to a post database model', () => {
    const postAggregate = PostAggregate.create({
      creatorId: new PostCreatorId({ value: '123' }),
      title: new PostTitle({ value: 'This is a valid post title' }),
      content: new PostContent({ value: 'This is a valid post content' }),
      flairs: null,
      nsfw: false,
      schedules: [],
    });

    const dbModel = mapper.toPersistence(postAggregate);

    expect(dbModel.creatorId).toEqual('123');
    expect(dbModel.title).toEqual('This is a valid post title');
    expect(dbModel.content).toEqual('This is a valid post content');
    expect(dbModel.flairs).toEqual(null);
    expect(dbModel.nsfw).toEqual(false);
  });
});
