import {baseRequestService} from "../base.ts";

export const communitiesCommunityIdAdminsProfileIdPost = (communityId: string, profileId: string) => baseRequestService({
    url: `/communities/${communityId}/admins/${profileId}`,
    method: 'POST',
})