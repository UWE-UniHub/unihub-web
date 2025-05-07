import {useQuery} from "@tanstack/react-query";
import {profilesProfileIdEventsGet} from "../api/profiles/profilesProfileIdEventsGet.ts";

export const useProfileEvents = (profileId?: string) => useQuery({
    queryKey: ['profilevents', profileId],
    queryFn: () => profilesProfileIdEventsGet(profileId!),
    enabled: Boolean(profileId)
})