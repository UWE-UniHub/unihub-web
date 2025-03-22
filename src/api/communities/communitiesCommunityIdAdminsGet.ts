import {baseRequestService} from "../base.ts";
import {CommunityAdmins} from "../../types/domain.ts";

export const communitiesCommunityIdAdminsGet = (communityId: string) => baseRequestService<CommunityAdmins>({
    url: `/communities/${communityId}/admins`,
    method: 'GET'
})