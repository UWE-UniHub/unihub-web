import {MockMethod} from "vite-plugin-mock";
import {makeUrl} from "./utils";

export default [
    {
        url: makeUrl('/posts/:postId/likes'),
        method: 'get',
        response: [
            {
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
            {
                "id": "444444456",
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
                "id": "4354",
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
                "id": "346346435",
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
                "id": "34637647",
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
                "id": "678678",
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
                "id": "1232342342345",
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
] as MockMethod[];