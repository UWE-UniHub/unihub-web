import {baseRequestService} from "../base.ts";
import {PostCommunity, PostProfile} from "../../types/domain.ts";

export const postsPostIdGet = (postId: string) => baseRequestService<PostProfile | PostCommunity>({
    url: `/posts/${postId}`,
    method: 'GET',
})