import { ValueObject } from 'src/core/domain/model/value-object';

interface PostScheduleProps {
  subredditName: string;
  scheduleTime: Date;
}

export class PostSchedule extends ValueObject<PostScheduleProps> {
  protected validate(props: PostScheduleProps): void {
    if (props.subredditName.length === 0) {
      throw new Error('Subreddit name cannot be empty');
    }

    if (props.scheduleTime.getTime() < Date.now()) {
      throw new Error('Schedule time cannot be in the past');
    }

    if (props.scheduleTime.getTime() === 0) {
      throw new Error('Schedule time cannot be empty');
    }
  }

  get subredditName(): string {
    return this.props.subredditName;
  }

  get scheduleTime(): Date {
    return this.props.scheduleTime;
  }
}
