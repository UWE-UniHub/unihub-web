import {FC, useEffect, useState} from "react";
import {EmptyFeed} from "../../../../components/EmptyFeed/EmptyFeed.tsx";
import {PostsFeed} from "../../../../components/PostsFeed/PostsFeed.tsx";
import {useFeed} from "../../../../stores/FeedStore.ts";
import {feedGet} from "../../../../api/posts/feedGet.ts";
import {App} from "antd";

export const FeedColumn: FC = () => {
    const { message } = App.useApp();
    const { feed, addPosts, updateLikes } = useFeed('main');
    const [loading, setLoading] = useState(false);

    const loadPosts = () => {
        if(feed.posts.length >= feed.count) return;

        setLoading(true);
        return feedGet(feed.next).then((f) => {
            addPosts(f.results, f.next_page, f.count);
        }).catch((e) => {
            console.error(e);
            void message.error(`Error loading the feed (${JSON.stringify(e)})`);
        }).finally(() => setLoading(false));
    }

    useEffect(() => {
        if(!feed.init) {
            setLoading(true);
            feedGet().then((f) => {
                addPosts(f.results, f.next_page, f.count);
            }).catch((e) => {
                console.error(e);
                void message.error(`Error loading the feed (${JSON.stringify(e)})`);
            }).finally(() => setLoading(false))
        }
    }, [feed.init]);

    if(!feed.posts.length) {
        return (
            <EmptyFeed />
        );
    }

    return (
        <PostsFeed
            posts={feed.posts}
            loading={loading}
            onScroll={loadPosts}
            onLikesUpdate={updateLikes}
        />
    )
}