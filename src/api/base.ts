import {isObject} from "../utils/isObject.ts";
import {isEmpty} from "../utils/isEmpty.ts";
import {API_BASE_URL} from "../constants/constants.ts";

type BaseRequestParams = {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    params?: Record<string, string | number | boolean>;
    data?: any;
    contentType?: string;
};

const transformData = (data: any, contentType?: string) => {
    if(!data) return undefined;
    if(contentType) return data;

    if(isObject(data)) return JSON.stringify(data);

    return data;
}

export const baseRequestService = <T>({
    url,
    method,
    params,
    data,
    contentType
}: BaseRequestParams): Promise<T> => {
    // @ts-expect-error typings are sad
    return fetch(API_BASE_URL + url + (!isEmpty(params) ? `?${new URLSearchParams(params)}` : ''), {
        method,
        headers: {
            'Content-Type': contentType || (isObject(data) ? 'application/json; charset=utf-8' : 'application/octet-stream')
        },
        body: transformData(data, contentType),
        credentials: 'same-origin'
    }).then((r) => {
        if(!r.ok) throw new Error(r.status.toString());
        return r.headers.get('content-type')?.includes('json')
            ? r.json()
            : r.text()
    });
}