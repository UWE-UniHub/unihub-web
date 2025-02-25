import {createBrowserRouter, Navigate, RouteObject} from "react-router";
import {LayoutWrapper} from "./components/LayoutWrapper/LayoutWrapper.tsx";
import {FeedPage} from "./pages/FeedPage/FeedPage.ts";
import {FC} from "react";

const path = (path: string, Page: FC): RouteObject => ({
    path,
    element: <Page />,
})

export const router = createBrowserRouter([
    {
        element: <LayoutWrapper />,
        children: [
            path('/', FeedPage),
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