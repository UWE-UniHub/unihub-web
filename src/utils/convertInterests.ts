import {capitalizeFirstLetter} from "./capitalizeFirstLetter.ts";

export const convertInterests = (interests: string): [string[], number, string[]] => {
    const arr = interests.split(',').map(capitalizeFirstLetter);
    return [arr.slice(0, 2), arr.length - 2, arr];
}