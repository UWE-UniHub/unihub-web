import {baseRequestService} from "../base.ts";
import {Profile} from "../../types/domain.ts";

export const profilesProfileIdSubscriptionsGet = (profileId: string) => baseRequestService<Profile[]>({
    url: `/profiles/${profileId}/subscriptions`,
    method: 'GET',
})