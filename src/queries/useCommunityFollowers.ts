import {useQuery} from "@tanstack/react-query";
import {communitiesCommunityIdFollowersGet} from "../api/communities/communitiesCommunityIdFollowersGet.ts";

export const useCommunityFollowers = (communityId: string, enabled: boolean) => useQuery({
    queryKey: ['community_followers', communityId],
    queryFn: () => communitiesCommunityIdFollowersGet(communityId),
    enabled
})