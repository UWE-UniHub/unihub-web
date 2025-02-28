import { Levels } from "../../types/domain.ts";
import {baseRequestService} from "../base.ts";

export const levelsGet = () => baseRequestService<Levels>({
    url: '/levels',
    method: 'GET',
})