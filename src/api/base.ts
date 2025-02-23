import {isObject} from "../utils/isObject.ts";
import {isEmpty} from "../utils/isEmpty.ts";
import {API_BASE_URL} from "../constants/constants.ts";

type BaseRequestParams = {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    params?: Record<string, string | number | boolean>;
    data?: any;
};

const transformData = (data: any) => {
    if(!data) return undefined;

    if(isObject(data)) return JSON.stringify(data);

    return new Blob([data], { type: 'text/plain' });
}

export const baseRequestService = <T>({
   url,
   method,
   params,
   data,
}: BaseRequestParams): Promise<T> => {
    // @ts-expect-error typings are sad
    return fetch(API_BASE_URL + url + (!isEmpty(params) ? `?${new URLSearchParams(params)}` : ''), {
        method,
        headers: {
            'Content-Type': isObject(data) ? 'application/json; charset=utf-8' : 'text/plain;charset=UTF-8'
        },
        body: transformData(data),
        credentials: 'same-origin'
    }).then((r) => {
        if(!r.ok) throw new Error(r.status.toString());
        return r.json()
    });
}