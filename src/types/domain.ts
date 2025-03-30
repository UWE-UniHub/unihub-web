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
  password: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  student: ProfileStudentInfo | null;
  staff: ProfileStaffInfo | null;
}

export interface ProfileStudentInfo {
  program: string;
  level: string;
  school: string;
}

export interface ProfileStaffInfo {
  position: string;
  department: string;
}

export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  is_staff?: boolean;
  bio: string | null;
  subscribers: number;
  subscriptions: number;
  student: ProfileStudentInfo | null;
  staff: ProfileStaffInfo | null;
}

export type ProfileById = Profile & {
  is_subscribed: boolean;
};

export interface ProfilePatch {
  first_name?: string;
  last_name?: string;
  bio?: string | null;
}

export interface Community {
  id: string;
  name: string;
  bio: string | null;
  subscribers: number;
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
}

export interface CommunityPatch {
  name?: string;
  bio?: string | null;
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
}

export type PostProfile = PostGeneric & {
  profile: Profile;
};

export type PostCommunity = PostGeneric & {
  community: Community;
};

export interface GenericFeed {
  count: number;
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

export interface PostPost {
  content: string;
  /** @format uuid */
  event_id: string | null;
}

export interface PostPatch {
  content?: string;
  /** @format uuid */
  event_id?: string | null;
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
