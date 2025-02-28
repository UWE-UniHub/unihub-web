import { Departments } from "../../types/domain.ts";
import {baseRequestService} from "../base.ts";

export const departmentsGet = () => baseRequestService<Departments>({
    url: '/departments',
    method: 'GET',
})