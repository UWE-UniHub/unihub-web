import {baseRequestService} from "../base.ts";

export const profilesProfileIdAvatarPut = (profile_id: string, data: Blob) => baseRequestService({
    url: `/profiles/${profile_id}/avatar`,
    method: 'PUT',
    data,
    contentType: 'image/png'
})