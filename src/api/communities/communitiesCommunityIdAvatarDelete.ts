import {baseRequestService} from "../base.ts";

export const communitiesCommunityIdAvatarDelete = (communityId: string) => baseRequestService({
    url: `/communities/${communityId}/avatar`,
    method: 'DELETE'
})