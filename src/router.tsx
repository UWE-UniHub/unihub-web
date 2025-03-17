import {createBrowserRouter, Navigate, RouteObject} from "react-router";
import {LayoutWrapper} from "./components/LayoutWrapper/LayoutWrapper.tsx";
import {FeedPage} from "./pages/FeedPage/FeedPage.tsx";
import {FC} from "react";
import {ProfilePage} from "./pages/ProfilePage/ProfilePage.tsx";
import {CommunityPage} from "./pages/CommunityPage/CommunityPage.tsx";
import {CommunitiesPage} from "./pages/CommunitiesPage/CommunitiesPage.tsx";

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
            path('/communities', CommunitiesPage),
            path('/community/:communityId', CommunityPage),
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