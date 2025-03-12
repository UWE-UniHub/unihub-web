import {baseRequestService} from "../base.ts";
import {CommunityDetailed} from "../../types/domain.ts";

export const communitiesCommunityIdGet = (communityId: string) => baseRequestService<CommunityDetailed>({
    url: `/communities/${communityId}`,
    method: 'GET'
})