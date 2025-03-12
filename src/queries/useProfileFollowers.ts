import {useQuery} from "@tanstack/react-query";
import {profilesProfileIdFollowersGet} from "../api/profiles/profilesProfileIdFollowersGet.ts";

export const useProfileFollowers = (profileId: string, enabled: boolean) => useQuery({
    queryKey: ['followers', profileId],
    queryFn: () => profilesProfileIdFollowersGet(profileId),
    enabled
})