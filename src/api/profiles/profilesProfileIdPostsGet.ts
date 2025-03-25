import {baseRequestService} from "../base.ts";
import {PostProfile} from "../../types/domain.ts";

export const profilesProfileIdPostsGet = (profileId: string) => baseRequestService<PostProfile[]>({
    url: `/profiles/${profileId}/posts`,
    method: 'GET'
})