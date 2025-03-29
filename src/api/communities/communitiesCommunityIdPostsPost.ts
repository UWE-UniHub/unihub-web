import {PostCommunity, PostPost} from "../../types/domain.ts";
import {baseRequestService} from "../base.ts";

export const communitiesCommunityIdPostsPost = (communityId: string, data: PostPost) => baseRequestService<PostCommunity>({
    url: `/communities/${communityId}/posts`,
    method: 'POST',
    data
})