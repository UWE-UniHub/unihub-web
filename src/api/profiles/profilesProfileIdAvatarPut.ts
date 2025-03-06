import {baseRequestService} from "../base.ts";

export const profilesProfileIdAvatarPut = (profile_id: string, data: string) => baseRequestService({
    url: `/profiles/${profile_id}/avatar`,
    method: 'PUT',
    data
})