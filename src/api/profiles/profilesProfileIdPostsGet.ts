import {baseRequestService} from "../base.ts";
import {FeedProfile} from "../../types/domain.ts";

export const profilesProfileIdPostsGet = (profileId: string, offset?: number, limit = 30) => baseRequestService<FeedProfile>({
    url: `/profiles/${profileId}/posts`,
    method: 'GET',
    params: {
        ...(offset ? { offset } : {}),
        limit
    },
})