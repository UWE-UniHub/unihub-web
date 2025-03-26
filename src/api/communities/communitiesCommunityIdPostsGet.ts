import {baseRequestService} from "../base.ts";
import {PostCommunity} from "../../types/domain.ts";

export const communitiesCommunityIdPostsGet = (communityId: string) => baseRequestService<PostCommunity[]>({
    url: `/communities/${communityId}/posts`,
    method: 'GET'
})