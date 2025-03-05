import {createBrowserRouter, Navigate, RouteObject} from "react-router";
import {LayoutWrapper} from "./components/LayoutWrapper/LayoutWrapper.tsx";
import {FeedPage} from "./pages/FeedPage/FeedPage.tsx";
import {FC} from "react";
import {ProfilePage} from "./pages/ProfilePage/ProfilePage.tsx";

const path = (path: string, Page: FC): RouteObject => ({
    path,
    element: <Page />,
})

export const router = createBrowserRouter([
    {
        element: <LayoutWrapper />,
        children: [
            path('/', FeedPage),
            path('/profile/:profileId', ProfilePage),
            {
                path: '/login',
                element: <Navigate to="/" state={{ modal: 'login' }} />
            },
            {
                path: '/signup',
                element: <Navigate to="/" state={{ modal: 'signup' }} />
            }
        ]
    }
])