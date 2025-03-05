import {useQuery} from "@tanstack/react-query";
import {profilesProfileIdGet} from "../api/profiles/profilesProfileIdGet.ts";

export const useProfileById = (id: string) => useQuery({
    queryKey: ['profile', id],
    queryFn: () => profilesProfileIdGet(id)
})