import {createBrowserRouter, RouteObject} from "react-router";
import {PageType} from "./types/PageType.ts";
import {LayoutWrapper} from "./components/LayoutWrapper/LayoutWrapper.tsx";
import {FeedPage} from "./pages/FeedPage/FeedPage.ts";

const path = (path: string, Page: PageType): RouteObject => ({
    path,
    element: <Page />,
    loader: Page.loader
})

export const router = createBrowserRouter([
    {
        element: <LayoutWrapper />,
        children: [
            path('/', FeedPage)
        ]
    }
])