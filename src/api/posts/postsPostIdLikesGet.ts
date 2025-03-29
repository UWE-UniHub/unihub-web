import {baseRequestService} from "../base.ts";

export const postsPostIdLikesGet = (postId: string) => baseRequestService({
    url: `/posts/${postId}/likes`,
    method: 'GET',
})