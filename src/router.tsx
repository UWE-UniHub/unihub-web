import {createBrowserRouter, Navigate, RouteObject} from "react-router";
import {LayoutWrapper} from "./components/LayoutWrapper/LayoutWrapper.tsx";
import {FeedPage} from "./pages/FeedPage/FeedPage.tsx";
import {FC} from "react";
import {ProfilePage} from "./pages/ProfilePage/ProfilePage.tsx";
import {CommunityPage} from "./pages/CommunityPage/CommunityPage.tsx";
import {CommunitiesPage} from "./pages/CommunitiesPage/CommunitiesPage.tsx";
import {PostPage} from "./pages/PostPage/PostPage.tsx";
import {EventsPage} from "./pages/EventsPage/EventsPage.tsx";

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
            path('/profile/:profileId/:postId', PostPage),
            path('/communities', CommunitiesPage),
            path('/community/:communityId', CommunityPage),
            path('/community/:communityId/:postId', PostPage),
            path('/events', EventsPage),
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