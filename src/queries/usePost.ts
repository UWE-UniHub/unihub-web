import {useQuery} from "@tanstack/react-query";
import {postsPostIdGet} from "../api/posts/postsPostIdGet.ts";

export const usePost = (postId: string) => useQuery({
    queryKey: ['posts', postId],
    queryFn: () => postsPostIdGet(postId)
})