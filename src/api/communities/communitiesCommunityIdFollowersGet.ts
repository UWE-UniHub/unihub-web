import {baseRequestService} from "../base.ts";
import {Profile} from "../../types/domain.ts";

export const communitiesCommunityIdFollowersGet = (communityId: string) => baseRequestService<Profile[]>({
    url: `/communities/${communityId}/followers`,
    method: 'GET',
})