import {baseRequestService} from "../base.ts";
import {FeedCommunity} from "../../types/domain.ts";

export const communitiesCommunityIdPostsGet = (communityId: string, page?: number) => baseRequestService<FeedCommunity>({
    url: `/communities/${communityId}/posts`,
    method: 'GET',
    params: {
        ...(page ? { page } : {})
    },
})