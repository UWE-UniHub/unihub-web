import {baseRequestService} from "../base.ts";

export const profilesProfileIdDelete = (id: string) => baseRequestService({
    url: `/profiles/${id}`,
    method: 'DELETE',
})