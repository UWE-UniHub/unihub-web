import {useQuery} from "@tanstack/react-query";
import {communitiesCommunityIdEventsGet} from "../api/communities/communitiesCommunityIdEventsGet.ts";

export const useCommunityEvents = (communityId: string) => useQuery({
    queryKey: ['communityevents', communityId],
    queryFn: () => communitiesCommunityIdEventsGet(communityId),
})