import {baseRequestService} from "../base.ts";
import {CommentCreate, Comment} from "../../types/domain.ts";

export const postsPostIdCommentsCommentIdPatch = (postId: string, commentId: string, data: CommentCreate) => baseRequestService<Comment>({
    url: `/posts/${postId}/comments/${commentId}`,
    method: 'PATCH',
    data
})