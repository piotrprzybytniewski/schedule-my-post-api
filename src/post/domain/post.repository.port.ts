import { RepositoryPort } from 'src/core/domain/repository.port';
import { PostAggregate } from './post.aggregate';

export const POST_REPOSITORY = Symbol('POST_REPOSITORY ');

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PostRepositoryPort extends RepositoryPort<PostAggregate> {}
