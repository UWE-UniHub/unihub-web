import {baseRequestService} from "../base.ts";

export const profilesProfileIdAvatarDelete = (profileId: string) => baseRequestService({
    url: `/profiles/${profileId}/avatar`,
    method: 'DELETE'
})