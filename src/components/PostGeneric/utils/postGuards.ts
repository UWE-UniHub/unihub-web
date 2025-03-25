import {PostCommunity, PostProfile} from "../../../types/domain.ts";

export const isProfilePost = (post: PostProfile | PostCommunity): post is PostProfile => Boolean((post as PostProfile).profile);
export const isCommunityPost = (post: PostProfile | PostCommunity): post is PostCommunity => Boolean((post as PostCommunity).community);