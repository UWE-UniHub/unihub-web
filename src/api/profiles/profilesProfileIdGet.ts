import {baseRequestService} from "../base.ts";
import {Profile} from "../../types/domain.ts";

export const profilesProfileIdGet = (id: string) => baseRequestService<Profile>({
    url: `/profiles/${id}`,
    method: 'GET',
})