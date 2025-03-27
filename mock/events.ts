import {MockMethod} from "vite-plugin-mock";
import {makeUrl} from "./utils";

export default [
    {
        url: makeUrl('/events'),
        method: 'get',
        response: [
            {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "description": "Event 1",
                "location": "3E021",
                "created_at": "2025-03-27T16:17:25.542Z",
                "date": "2025-03-27T16:17:25.542Z",
                "profile": {
                    "id": "string",
                    "first_name": "string",
                    "last_name": "string",
                    "is_staff": true,
                    "bio": "string",
                    "subscribers": 0,
                    "subscriptions": 0,
                    "student": {
                        "program": "string",
                        "level": "string",
                        "school": "string"
                    },
                    "staff": {
                        "position": "string",
                        "department": "string"
                    }
                }
            },
            {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa7",
                "description": "Event 2",
                "location": "2A021B",
                "created_at": "2025-03-27T16:17:25.543Z",
                "date": "2025-03-27T16:17:25.543Z",
                "community": {
                    "id": "string",
                    "name": "string",
                    "bio": "string",
                    "subscribers": 0
                }
            }
        ]
    }
] as MockMethod[];