import {baseRequestService} from "../base.ts";

export const eventsEventIdSubscribeDelete = (eventId: string) => baseRequestService({
    url: `/events/${eventId}/subscribe`,
    method: 'DELETE'
})