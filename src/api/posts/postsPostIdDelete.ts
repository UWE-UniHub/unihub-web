import {baseRequestService} from "../base.ts";

export const postsPostIdDelete = (postId: string) => baseRequestService({
    url: `/posts/${postId}`,
    method: 'DELETE',
})