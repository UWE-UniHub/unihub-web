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
    },
    {
        url: makeUrl('/profiles/:id/posts'),
        method: 'get',
        response: [
            {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id orci cursus turpis convallis aliquet. Morbi vehicula suscipit tortor eu pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi quis maximus velit. Donec ut ligula ipsum. Ut a lacinia libero. Sed ornare sem risus, eget ultrices lorem dictum a. Sed nec elit nec diam hendrerit maximus. Nam malesuada quam in turpis efficitur, sed rhoncus erat dictum. Fusce elementum mollis magna, non auctor risus scelerisque at.\n" +
                    "\n" +
                    "Vestibulum condimentum pretium elit eget vestibulum. Quisque libero turpis, lacinia vel sem in, aliquet malesuada lorem. Nullam ut libero eu nulla pharetra vestibulum sed eget ipsum. Donec vehicula augue sed massa pretium finibus. Quisque dignissim dignissim turpis, sed porta felis tempus at. Quisque commodo accumsan arcu. Suspendisse eu metus iaculis, tincidunt dolor id, placerat augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In pulvinar lectus quis mi ornare, at sagittis urna rutrum. Quisque cursus ante eu urna finibus hendrerit.",
                "created_at": "2025-03-24T22:29:43.570Z",
                "event": undefined,
                "likes": 999,
                "is_liked": true,
                "profile": {
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
        ]
    }
] as MockMethod[];