import {LoginPost} from "../../types/domain.ts";
import {baseRequestService} from "../base.ts";

// FIXME LoginPost -> SignupPost
export const authSignupPost = (data: LoginPost) => baseRequestService({
    url: '/auth/signup',
    method: 'POST',
    data
})