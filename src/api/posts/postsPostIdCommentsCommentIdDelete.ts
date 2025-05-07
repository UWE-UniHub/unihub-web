import {baseRequestService} from "../base.ts";

export const postsPostIdCommentsCommentIdDelete = (postId: string, commentId: string) => baseRequestService({
    url: `/posts/${postId}/comments/${commentId}`,
    method: 'DELETE'
})