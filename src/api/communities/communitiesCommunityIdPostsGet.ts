import {baseRequestService} from "../base.ts";
import {FeedCommunity} from "../../types/domain.ts";

export const communitiesCommunityIdPostsGet = (communityId: string, offset?: number, limit = 30) => baseRequestService<FeedCommunity>({
    url: `/communities/${communityId}/posts`,
    method: 'GET',
    params: {
        ...(offset ? { offset } : {}),
        limit
    },
})