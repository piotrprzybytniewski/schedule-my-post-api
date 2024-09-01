export class PostCannotSchedulePublishedPostException extends Error {
  constructor() {
    super('Post cannot be scheduled when it is already published');
  }
}
