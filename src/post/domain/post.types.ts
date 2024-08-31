import { PostContent } from './value-object/post-content.vo';
import { PostFlairs } from './value-object/post-flairs.vo';
import { PostSchedule } from './value-object/post-schedule.vo';
import { PostStatus } from './value-object/post-status.vo';
import { PostTitle } from './value-object/post-title.vo';

export interface PostProps {
  status: PostStatus;
  title: PostTitle;
  content: PostContent;
  flairs: PostFlairs | null;
  schedules: PostSchedule[];
}

export interface CreatePostProps extends PostProps {}
