import {baseRequestService} from "../base.ts";
import {ProfileById} from "../../types/domain.ts";

export const profilesProfileIdGet = (id: string) => baseRequestService<ProfileById>({
    url: `/profiles/${id}`,
    method: 'GET',
})