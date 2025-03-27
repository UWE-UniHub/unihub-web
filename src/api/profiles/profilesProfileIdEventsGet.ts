import {baseRequestService} from "../base.ts";
import {EventProfile} from "../../types/domain.ts";

export const profilesProfileIdEventsGet = (profileId: string) => baseRequestService<EventProfile[]>({
    url: `/profiles/${profileId}/events`,
    method: 'GET'
})