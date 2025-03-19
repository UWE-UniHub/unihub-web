import {MockMethod} from "vite-plugin-mock";
import {makeUrl} from "./utils";

export default [
    {
        url: makeUrl("/communities"),
        method: 'get',
        response: [
            {
                "id": "foobar",
                "name": "Foo Bar Community",
                "bio": "We are Foo Bar Community, welcome!We are Foo Bar Community, welcome!We are Foo Bar Community, welcome!We are Foo Bar Community, welcome!We are Foo Bar Community, welcome!We are Foo Bar Community, welcome!We are Foo Bar Community, welcome!",
                "subscribers": 567
            },
            {
                "id": "foobar1",
                "name": "Foo Bar Community",
                "bio": "We are Foo Bar Community, welcome irfkr korkforfkork okro ko ko !",
                "subscribers": 567
            },
            {
                "id": "foobar2",
                "name": "Foo Bar Community",
                "bio": "We are Foo Bar Community, welcomeo ok ok ok ok ok o ko!",
                "subscribers": 567
            },
            {
                "id": "foobar3",
                "name": "Foo Bar Community",
                "bio": "We are Foo Bar Community, welcome!",
                "subscribers": 567
            },
            {
                "id": "foobar4",
                "name": "Foo Bar Community",
                "bio": "We are Foo Bar Community, welcome!",
                "subscribers": 567
            },
            {
                "id": "foobar5",
                "name": "Foo Bar Community",
                "bio": "We are Foo Bar Community, welcome!",
                "subscribers": 567
            }
        ]
    },
    {
        url: makeUrl('/communities/:id'),
        method: 'get',
        response: {
            "id": "foobar",
            "name": "Foo Bar Community",
            "bio": "We are Foo Bar Community, welcome!",
            "subscribers": 567,
            "is_admin": true,
            "is_creator": true,
            "is_subscribed": false
        }
    },
    {
        url: makeUrl('/communities/:id/admins'),
        method: 'get',
        response: {
            creator: {
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
            },
            admins: [
                {
                    "id": "44444445",
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
                },
                {
                    "id": "44444446",
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
            ]
        }
    }
] as MockMethod[];