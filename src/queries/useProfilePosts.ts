import {useQuery} from "@tanstack/react-query";
import {profilesProfileIdPostsGet} from "../api/profiles/profilesProfileIdPostsGet.ts";

// FIXME fix to fit feed specs with limit and cursor
export const useProfilePosts = (profileId: string, skip?: boolean) => useQuery({
    queryKey: ['profileposts', profileId],
    queryFn: () => profilesProfileIdPostsGet(profileId),
    enabled: !skip,
})