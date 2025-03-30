import {baseRequestService} from "../base.ts";
import {Feed} from "../../types/domain.ts";

export const feedGet = (offset?: number, limit = 30) => baseRequestService<Feed>({
    url: '/feed',
    method: 'GET',
    params: {
        ...(offset ? { offset } : {}),
        limit
    },
})