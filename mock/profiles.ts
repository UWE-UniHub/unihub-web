import {MockMethod} from "vite-plugin-mock";
import {makeUrl} from "./utils";

export default [
    {
        url: makeUrl('/profiles/:id'),
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
    },
    {
        url: makeUrl('/profiles/:id/avatar'),
        method: 'get',
        rawResponse: async (_, res) => {
            res.setHeader('Location', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCBicf_37vAeZHXUtkIx5TGE8sBgCxO41mmQ&s');
            res.statusCode = 302;
            res.end();
        }
    }
] as MockMethod[];