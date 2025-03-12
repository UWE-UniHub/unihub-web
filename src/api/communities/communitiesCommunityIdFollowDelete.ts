import {baseRequestService} from "../base.ts";

export const communitiesCommunityIdFollowDelete = (communityId: string) => baseRequestService({
    url: `/communities/${communityId}/follow`,
    method: 'DELETE',
})