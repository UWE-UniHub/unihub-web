import {baseRequestService} from "../base.ts";

export const profilesProfileIdFollowPost = (profileId: string) => baseRequestService({
    url: `/profiles/${profileId}/follow`,
    method: 'POST',
})