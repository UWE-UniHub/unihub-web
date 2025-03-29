import {useQuery} from "@tanstack/react-query";
import {feedGet} from "../api/posts/feedGet.ts";

// TODO query -> store when feed is converted to a smart one
export const useFeed = () => useQuery({
    queryKey: ['feed'],
    queryFn: () => feedGet()
})