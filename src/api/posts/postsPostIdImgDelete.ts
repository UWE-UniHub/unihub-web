import {baseRequestService} from "../base.ts";

export const postsPostIdImgDelete = (postId: string) => baseRequestService({
    url: `/posts/${postId}/img`,
    method: 'DELETE',
})