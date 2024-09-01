export class PostTitleTooLongException extends Error {
  constructor() {
    super('Post title cannot be longer than 300 characters');
  }
}
