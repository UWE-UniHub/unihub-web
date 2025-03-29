import {PostPost, PostProfile} from "../../types/domain.ts";
import {baseRequestService} from "../base.ts";

export const profilesProfileIdPostsPost = (profileId: string, data: PostPost) => baseRequestService<PostProfile>({
    url: `/profiles/${profileId}/posts`,
    method: 'POST',
    data
})