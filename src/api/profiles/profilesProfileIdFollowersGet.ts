import {baseRequestService} from "../base.ts";
import {Profile} from "../../types/domain.ts";

export const profilesProfileIdFollowersGet = (profileId: string) => baseRequestService<Profile[]>({
    url: `/profiles/${profileId}/followers`,
    method: 'GET',
})