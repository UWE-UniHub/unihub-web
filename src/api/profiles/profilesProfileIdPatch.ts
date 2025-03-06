import {ProfilePatch} from "../../types/domain.ts";
import {baseRequestService} from "../base.ts";

export const profilesProfileIdPatch = (profileId: string, data: ProfilePatch) => baseRequestService({
    url: `/profiles/${profileId}`,
    method: 'PATCH',
    data
})