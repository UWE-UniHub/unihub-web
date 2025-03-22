import {baseRequestService} from "../base.ts";
import {Profile} from "../../types/domain.ts";

export const communitiesCommunityIdAdminsEligibleGet = (communityId: string) => baseRequestService<Profile[]>({
    url: `/communities/${communityId}/admins/eligible`,
    method: 'GET'
})