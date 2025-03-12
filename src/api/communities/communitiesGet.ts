import {baseRequestService} from "../base.ts";
import {Community} from "../../types/domain.ts";

export const communitiesGet = () => baseRequestService<Community[]>({
    url: '/communities',
    method: 'GET'
})