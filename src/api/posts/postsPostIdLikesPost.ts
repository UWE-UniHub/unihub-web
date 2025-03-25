import {baseRequestService} from "../base.ts";

export const postsPostIdLikesPost = (postId: string) => baseRequestService({
    url: `/posts/${postId}/likes`,
    method: 'POST'
})