import {baseRequestService} from "../base.ts";

export const communitiesCommunityIdAvatarPut = (communityId: string, data: Blob) => baseRequestService({
    url: `/communities/${communityId}/avatar`,
    method: 'PUT',
    data,
    contentType: 'image/png'
})