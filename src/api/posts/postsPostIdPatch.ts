import {PostCommunity, PostPatch, PostProfile} from "../../types/domain.ts";
import {baseRequestService} from "../base.ts";

export const postsPostIdPatch = (postId: string, data: PostPatch) => baseRequestService<PostProfile | PostCommunity>({
    url: `/posts/${postId}`,
    method: 'PATCH',
    data
})