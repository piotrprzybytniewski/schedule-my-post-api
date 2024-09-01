export class PostCannotRepublishException extends Error {
  constructor() {
    super('Post cannot be republished, it was already published');
  }
}
