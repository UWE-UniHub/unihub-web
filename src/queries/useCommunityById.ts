import {useQuery} from "@tanstack/react-query";
import {communitiesCommunityIdGet} from "../api/communities/communitiesCommunityIdGet.ts";

export const useCommunityById = (communityId: string) => useQuery({
    queryKey: ['community', communityId],
    queryFn: () => communitiesCommunityIdGet(communityId)
})