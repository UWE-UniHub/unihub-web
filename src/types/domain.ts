/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SignupPost {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  student: ProfileStudentInfo | null;
  staff: ProfileStaffInfo | null;
  address: string;
  /** @format date-time */
  date_of_birth: string;
  /** Comma-separated strings */
  interests: string;
}

export interface ProfileStudentInfo {
  program: string;
  year: number;
  school: string;
}

export interface ProfileStaffInfo {
  position: string;
  department: string;
}

export interface Profile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff?: boolean;
  bio: string | null;
  subscribers: number;
  subscriptions: number;
  student: ProfileStudentInfo | null;
  staff: ProfileStaffInfo | null;
  /** Only shown for own profile */
  address: string | null;
  /** @format date-time */
  date_of_birth: string;
  /** Comma-separated strings */
  interests: string;
}

export type ProfileById = Profile & {
  is_subscribed: boolean;
};

export interface ProfilePatch {
  first_name?: string;
  last_name?: string;
  bio?: string | null;
  email?: string;
  address?: string;
  /** @format date-time */
  date_of_birth?: string;
  /** Comma-separated strings */
  interests?: string;
}

export interface Community {
  id: string;
  name: string;
  bio: string | null;
  subscribers: number;
  tags: string;
}

export type CommunityDetailed = Community & {
  is_admin: boolean;
  is_creator: boolean;
  is_subscribed: boolean;
};

export interface CommunityPost {
  id: string;
  name: string;
  bio: string | null;
  tags: string;
}

export interface CommunityPatch {
  name?: string;
  bio?: string | null;
  tags?: string;
}

export interface CommunityAdmins {
  creator?: Profile;
  admins?: Profile[];
}

export interface PostGeneric {
  /** @format uuid */
  id: string;
  content: string;
  /** @format date-time */
  created_at: string;
  event?: EventProfile | EventCommunity;
  likes: number;
  is_liked: boolean;
  is_editable: boolean;
  hidden: boolean;
  /** Comma-separated string */
  tags: string | null;
}

export type PostProfile = PostGeneric & {
  profile: Profile;
};

export type PostCommunity = PostGeneric & {
  community: Community;
};

export interface GenericFeed {
  count: number;
  total_pages: number;
  current_page: number;
  next_page: number;
  previous_page: number;
}

export type Feed = GenericFeed & {
  results: (PostCommunity | PostProfile)[];
};

export type FeedProfile = GenericFeed & {
  results: PostProfile[];
};

export type FeedCommunity = GenericFeed & {
  results: PostCommunity[];
};

export type FeedComments = GenericFeed & {
  results: Comment[];
};

export interface PostPost {
  content: string;
  /** @format uuid */
  event_id: string | null;
  hidden: boolean;
  tags: string | null;
}

export interface PostPatch {
  content?: string;
  /** @format uuid */
  event_id?: string | null;
  hidden?: boolean;
  /** Comma-separated string */
  tags?: string | null;
}

export interface Comment {
  /** @format uuid */
  id: string;
  /** @format uuid */
  post: string;
  author: Profile;
  content: string;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
}

export interface CommentCreate {
  content: string;
}

export interface EventGeneric {
  /** @format uuid */
  id: string;
  description: string;
  location: string;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  date: string;
  /** Comma separated strings */
  required_materials: string;
  max_capacity: number;
  subscribers_count: number;
  is_subscribed: boolean;
  is_deleteable: boolean;
}

export type EventProfile = EventGeneric & {
  profile: Profile;
};

export type EventCommunity = EventGeneric & {
  community: Community;
};

export interface EventPost {
  description: string;
  location: string;
  /** @format date-time */
  date: string;
  /** Comma separated strings */
  required_materials: string;
  max_capacity: number;
}

export interface EventPatch {
  description?: string;
  location?: string;
  /** @format date-time */
  date?: string;
}

export interface LoginPost {
  id: number;
  password: string;
}

export interface Levels {
  levels: string[];
}

export interface Schools {
  schools: string[];
}

export interface Departments {
  departments: string[];
}

export interface SearchResult {
  profiles: Profile[];
  communities: Community[];
  posts: (PostProfile | PostCommunity)[];
  events: (EventProfile | EventCommunity)[];
}
