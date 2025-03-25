import {baseRequestService} from "../base.ts";

export const postsPostIdLikesDelete = (postId: string) => baseRequestService({
    url: `/posts/${postId}/likes`,
    method: 'DELETE'
})