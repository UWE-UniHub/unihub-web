import {baseRequestService} from "../base.ts";
import {EventCommunity} from "../../types/domain.ts";

export const communitiesCommunityIdEventsGet = (communityId: string) => baseRequestService<EventCommunity[]>({
    url: `/communities/${communityId}/events`,
    method: 'GET',
})