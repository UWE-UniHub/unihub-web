import {useQuery} from "@tanstack/react-query";
import {profilesProfileIdSubscriptionsGet} from "../api/profiles/profilesProfileIdSubscriptionsGet.ts";

export const useProfileSubscriptions = (profileId: string, enabled: boolean) => useQuery({
    queryKey: ['subscriptions', profileId],
    queryFn: () => profilesProfileIdSubscriptionsGet(profileId),
    enabled
})