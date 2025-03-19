import {baseRequestService} from "../base.ts";

export const communitiesCommunityIdAdminsProfileIdDelete = (communityId: string, profileId: string) => baseRequestService({
    url: `/communities/${communityId}/admins/${profileId}`,
    method: 'DELETE',
})