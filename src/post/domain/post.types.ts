import { PostContent } from './value-object/post-content.vo';
import { PostCreatorId } from './value-object/post-creator-id.vo';
import { PostFlairs } from './value-object/post-flairs.vo';
import { PostSchedule } from './value-object/post-schedule.vo';
import { PostStatus } from './value-object/post-status.vo';
import { PostTitle } from './value-object/post-title.vo';

export interface CreatePostProps {
  creatorId: PostCreatorId;
  title: PostTitle;
  content: PostContent;
  flairs: PostFlairs | null;
  nsfw: boolean;
  schedules: PostSchedule[];
}

export interface PostProps extends CreatePostProps {
  status: PostStatus;
  externalId?: PostExternalId;
}

export type PostExternalId = string;
