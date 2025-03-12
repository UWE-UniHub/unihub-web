import {MockMethod} from "vite-plugin-mock";
import {makeUrl} from "./utils";

export default [
    {
        url: makeUrl('/communities/:id'),
        method: 'get',
        response: {
            "id": "foobar",
            "name": "Foo Bar Community",
            "bio": "We are Foo Bar Community, welcome!",
            "subscribers": 567,
            "is_admin": true,
            "is_creator": false,
            "is_subscribed": false
        }
    }
] as MockMethod[];