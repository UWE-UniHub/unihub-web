import { Schools } from "../../types/domain.ts";
import {baseRequestService} from "../base.ts";

export const schoolsGet = () => baseRequestService<Schools>({
    url: '/schools',
    method: 'GET',
})