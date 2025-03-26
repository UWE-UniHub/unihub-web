import {useQuery} from "@tanstack/react-query";
import {communitiesCommunityIdPostsGet} from "../api/communities/communitiesCommunityIdPostsGet.ts";

// FIXME fix to fit feed specs with limit and cursor
export const useCommunityPosts = (communityId: string, skip?: boolean) => useQuery({
    queryKey: ['communityposts', communityId],
    queryFn: () => communitiesCommunityIdPostsGet(communityId),
    enabled: !skip,
})