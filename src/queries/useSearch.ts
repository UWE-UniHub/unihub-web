import { useDebounce } from "@uidotdev/usehooks";
import {useQuery} from "@tanstack/react-query";
import {searchGet} from "../api/search/searchGet.ts";

export const useSearch = (q: string) => {
    const debQ = useDebounce(q, 500);

    const query = useQuery({
        queryKey: ['search', debQ],
        queryFn: () => searchGet(debQ),
        placeholderData: (prev) => prev,
        enabled: Boolean(debQ),
    });

    return [
        query,
        q !== debQ || query.isFetching,
    ] as const;
}