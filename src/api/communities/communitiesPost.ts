import {Community, CommunityPost} from "../../types/domain.ts";
import {baseRequestService} from "../base.ts";

export const communitiesPost = (data: CommunityPost) => baseRequestService<Community>({
    url: '/communities',
    method: 'POST',
    data
})