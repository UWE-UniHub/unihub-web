import {MockMethod} from "vite-plugin-mock";
import {makeUrl} from "./utils";

export default [
    {
        url: makeUrl('/auth'),
        method: 'get',
        response: {
            "id": "44444444",
            "first_name": "John",
            "last_name": "Doe",
            "bio": "Starter",
            "is_staff": true,
            "subscribers": 1,
            "subscriptions": 0,
            "student": null,
            "staff": {
                "position": "Lecturer",
                "department": "FooBar"
            }
        }
    }
] as MockMethod[];