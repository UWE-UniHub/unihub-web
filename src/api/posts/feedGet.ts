import {baseRequestService} from "../base.ts";
import {Feed} from "../../types/domain.ts";

export const feedGet = (page?: number) => baseRequestService<Feed>({
    url: '/feed',
    method: 'GET',
    params: {
        ...(page ? { page } : {})
    },
})