import {baseRequestService} from "../base.ts";

export const eventsEventIdSubscribePost = (eventId: string) => baseRequestService({
    url: `/events/${eventId}/subscribe`,
    method: 'POST'
})