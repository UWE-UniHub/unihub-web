import {useQuery} from "@tanstack/react-query";
import {communitiesGet} from "../api/communities/communitiesGet.ts";

export const useCommunities = () => useQuery({
    queryKey: ['communities'],
    queryFn: communitiesGet
})