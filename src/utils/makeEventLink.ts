import {EventCommunity, EventProfile} from "../types/domain.ts";
import {isCommunityEvent, isProfileEvent} from "./eventGuards.ts";

export const makeEventLink = (event: EventCommunity | EventProfile) => {
    if(isCommunityEvent(event))
        return `/community/${event.community.id}?eventId=${event.id}`;
    if(isProfileEvent(event))
        return `/profile/${event.profile.id}?eventId=${event.id}`;
    return '';
}
