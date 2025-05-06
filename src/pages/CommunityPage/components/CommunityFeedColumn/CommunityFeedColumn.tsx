import {FC, useEffect, useState} from "react";
import {EmptyFeed} from "../../../../components/EmptyFeed/EmptyFeed.tsx";
import {CommunityDetailed, EventCommunity} from "../../../../types/domain.ts";
import {App, Flex, Typography} from "antd";
import {PostEditor} from "../../../../components/PostEditor/PostEditor.tsx";
import {useFeed} from "../../../../stores/FeedStore.ts";
import {communitiesCommunityIdPostsGet} from "../../../../api/communities/communitiesCommunityIdPostsGet.ts";
import {PostsFeed} from "../../../../components/PostsFeed/PostsFeed.tsx";

type Props = {
    community: CommunityDetailed;
    events: EventCommunity[];
}

export const CommunityFeedColumn: FC<Props> = ({ community, events }) => {
    const { message } = App.useApp();
    const { feed, addPosts, updateLikes, flushPosts } = useFeed('community', community.id);
    const [loading, setLoading] = useState(false);

    const initFeed = () => {
        if(loading) return;
        setTimeout(() => {
            setLoading(true);
            communitiesCommunityIdPostsGet(community.id).then((f) => {
                flushPosts();
                addPosts(f.results, f.next_page, f.count);
            }).catch((e) => {
                console.error(e);
                void message.error(`Error loading the feed (${JSON.stringify(e)})`);
            }).finally(() => setLoading(false));
        },2000)
    }

    const loadPosts = () => {
        if(feed.posts.length >= feed.count) return;

        setLoading(true);
        return communitiesCommunityIdPostsGet(community.id, feed.next).then((f) => {
            addPosts(f.results, f.next_page, f.count);
        }).catch((e) => {
            console.error(e);
            void message.error(`Error loading the feed (${JSON.stringify(e)})`);
        }).finally(() => setLoading(false));
    }

    useEffect(() => {
        if(!feed.posts.length) {
            initFeed();
        }
    }, [initFeed, feed]);

    if(!feed.posts.length) {
        return (
            <Flex vertical gap={16}>
            <Typography.Title level={3}>Publications</Typography.Title>
            {community.is_admin && (
                <PostEditor
                    target={community}
                    events={events}
                    onPost={initFeed}
                />
            )}
            <EmptyFeed />
            </Flex>
        );
    }

    return (
        <Flex vertical gap={16}>
            <Typography.Title level={3}>Publications</Typography.Title>
            {community.is_admin && (
                <PostEditor
                    target={community}
                    events={events}
                    onPost={initFeed}
                />
            )}
            <PostsFeed
                posts={feed.posts}
                loading={loading}
                onScroll={loadPosts}
                onLikesUpdate={updateLikes}
            />
        </Flex>
    )
}