import {baseRequestService} from "../base.ts";
import {Profile} from "../../types/domain.ts";

export const postsPostIdLikesGet = (postId: string) => baseRequestService<Profile[]>({
    url: `/posts/${postId}/likes`,
    method: 'GET',
})