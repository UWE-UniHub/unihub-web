import {baseRequestService} from "../base.ts";

export const authDelete = () => baseRequestService({
    url: '/auth/logout',
    method: 'DELETE',
})