import {baseRequestService} from "../base.ts";

export const communitiesCommunityIdFollowPost = (communityId: string) => baseRequestService({
    url: `/communities/${communityId}/follow`,
    method: 'POST',
})