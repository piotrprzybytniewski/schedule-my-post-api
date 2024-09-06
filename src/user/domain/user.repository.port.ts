export const USER_REPOSITORY = Symbol('USER_REPOSITORY ');

export interface UserRepositoryPort {
  findRefreshTokenByUserId(userId: string): Promise<string | null>;
}
