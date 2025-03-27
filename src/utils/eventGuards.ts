import {EventCommunity, EventProfile} from "../types/domain.ts";

export const isCommunityEvent = (event: EventCommunity | EventProfile): event is EventCommunity =>
    Boolean((event as EventCommunity).community);

export const isProfileEvent = (event: EventCommunity | EventProfile): event is EventProfile =>
    Boolean((event as EventProfile).profile);