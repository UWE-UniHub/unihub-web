import {EventPost} from "../../types/domain.ts";
import {baseRequestService} from "../base.ts";

export const profilesProfileIdEventsPost = (profileId: string, data: EventPost) => baseRequestService({
    url: `/profiles/${profileId}/events`,
    method: 'POST',
    data
})