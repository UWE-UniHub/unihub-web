import {baseRequestService} from "../base.ts";
import {FeedProfile} from "../../types/domain.ts";

export const profilesProfileIdPostsGet = (profileId: string, page?: number) => baseRequestService<FeedProfile>({
    url: `/profiles/${profileId}/posts`,
    method: 'GET',
    params: {
        ...(page ? { page } : {}),
    },
})