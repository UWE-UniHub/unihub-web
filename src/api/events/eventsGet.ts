import {baseRequestService} from "../base.ts";
import {EventCommunity, EventProfile} from "../../types/domain.ts";

export const eventsGet = () => baseRequestService<(EventProfile | EventCommunity)[]>({
    url: '/events',
    method: 'GET',
})