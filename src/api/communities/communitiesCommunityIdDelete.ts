import {baseRequestService} from "../base.ts";

export const communitiesCommunityIdDelete = (communityId: string) => baseRequestService({
    url: `/communities/${communityId}`,
    method: 'DELETE'
})