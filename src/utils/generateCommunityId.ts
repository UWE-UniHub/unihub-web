import {generate} from "random-words";

export const generateCommunityId = () => {
    const value = generate({ exactly: 1, wordsPerString: 2, separator: '-', minLength: 4, maxLength: 10 });
    if(Array.isArray(value)) return value[0];
    return value;
}