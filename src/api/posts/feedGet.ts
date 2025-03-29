import {baseRequestService} from "../base.ts";
import {Feed} from "../../types/domain.ts";

// TODO fix typings when swagger is fixed
export const feedGet = (feedPointer?: number, feedLimit = 30) => baseRequestService<Feed>({
    url: '/feed',
    method: 'GET',
    params: {
        ...(feedPointer ? { feedPointer } : {}),
        feedLimit
    },
})