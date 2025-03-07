import {baseRequestService} from "../base.ts";

export const profilesProfileIdFollowDelete = (profileId: string) => baseRequestService({
    url: `/profiles/${profileId}/follow`,
    method: 'DELETE',
})