import {useQuery} from "@tanstack/react-query";
import {communitiesCommunityIdAdminsGet} from "../api/communities/communitiesCommunityIdAdminsGet.ts";

export const useCommunityAdmins = (communityId: string) => useQuery({
    queryKey: ['communityAdmins', communityId],
    queryFn: () => communitiesCommunityIdAdminsGet(communityId),
})