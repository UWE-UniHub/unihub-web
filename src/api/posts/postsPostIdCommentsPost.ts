import {baseRequestService} from "../base.ts";
import {Comment, CommentCreate} from "../../types/domain.ts";

export const postsPostIdCommentsPost = (postId: string, data: CommentCreate) => baseRequestService<Comment>({
    url: `/posts/${postId}/comments`,
    method: 'POST',
    data
})