import {CommunityDetailed, CommunityPatch} from "../../types/domain.ts";
import {baseRequestService} from "../base.ts";

export const communitiesCommunityIdPatch = (communityId: string, data: CommunityPatch) => baseRequestService<CommunityDetailed>({
    url: `/communities/${communityId}`,
    method: 'PATCH',
    data
})