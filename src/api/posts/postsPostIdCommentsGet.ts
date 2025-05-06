import {baseRequestService} from "../base.ts";
import {FeedComments} from "../../types/domain.ts";

export const postsPostIdCommentsGet = (postId: string, page?: number) => baseRequestService<FeedComments>({
    url: `/posts/${postId}/comments`,
    method: 'GET',
    params: {
        ...(page ? { page } : {})
    }
})