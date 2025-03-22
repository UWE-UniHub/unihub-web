import {useQuery} from "@tanstack/react-query";
import {communitiesCommunityIdAdminsEligibleGet} from "../api/communities/communitiesCommunityIdAdminsEligibleGet.ts";

export const useCommunityEligibleAdmins = (communityId: string) => useQuery({
    queryKey: ['eligibleAdmins', communityId],
    queryFn: () => communitiesCommunityIdAdminsEligibleGet(communityId),
})