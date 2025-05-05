import {baseRequestService} from "../base.ts";
import {SearchResult} from "../../types/domain.ts";

export const searchGet = (q: string) => baseRequestService<SearchResult>({
    url: '/search/',
    method: 'GET',
    params: { q }
})