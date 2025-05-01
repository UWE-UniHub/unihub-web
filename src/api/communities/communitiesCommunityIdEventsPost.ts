import {EventPost} from "../../types/domain.ts";
import {baseRequestService} from "../base.ts";

export const communitiesCommunityIdEventsPost = (communityId: string, data: EventPost) => baseRequestService({
    url: `/communities/${communityId}/events`,
    method: 'POST',
    data
})