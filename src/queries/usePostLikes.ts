import {useQuery} from "@tanstack/react-query";
import {postsPostIdLikesGet} from "../api/posts/postsPostIdLikesGet.ts";

export const usePostLikes = (postId: string) => useQuery({
    queryKey: ['postlikes', postId],
    queryFn: () => postsPostIdLikesGet(postId)
})