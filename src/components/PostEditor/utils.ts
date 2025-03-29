import {Community, Profile} from "../../types/domain.ts";

export const isProfileTarget = (target: Profile | Community): target is Profile => Boolean((target as Profile).first_name);
export const isCommunityTarget = (target: Profile | Community): target is Community => Boolean((target as Community).name);