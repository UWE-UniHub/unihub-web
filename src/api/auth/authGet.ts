import {baseRequestService} from "../base.ts";
import {Profile} from "../../types/domain.ts";

export const authGet = () => baseRequestService<Profile>({
    url: '/auth',
    method: 'GET',
})