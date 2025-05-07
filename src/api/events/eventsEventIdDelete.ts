import {baseRequestService} from "../base.ts";

export const eventsEventIdDelete = (eventId: string) => baseRequestService({
    url: `/events/${eventId}`,
    method: 'DELETE',
})