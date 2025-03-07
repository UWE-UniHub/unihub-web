import {baseRequestService} from "../base.ts";
import {ProfileById} from "../../types/domain.ts";

export const profilesProfileIdDelete = (id: string) => baseRequestService<ProfileById>({
    url: `/profiles/${id}`,
    method: 'DELETE',
})