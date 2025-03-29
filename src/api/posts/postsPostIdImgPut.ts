import {baseRequestService} from "../base.ts";

export const postsPostIdImgPut = (postId: string, data: Blob) => baseRequestService({
    url: `/posts/${postId}/img`,
    method: 'PUT',
    data,
    contentType: 'image/png'
})