import {LoginPost, Profile} from "../../types/domain.ts";
import {baseRequestService} from "../base.ts";

export const authLoginPost = (data: LoginPost) => baseRequestService<Profile>({
    url: '/auth/login',
    method: 'POST',
    data
})