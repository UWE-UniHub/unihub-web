import {FC, useEffect, useState} from "react";
import {EmptyFeed} from "../../../../components/EmptyFeed/EmptyFeed.tsx";
import {EventProfile, ProfileById} from "../../../../types/domain.ts";
import {App, Flex, Typography} from "antd";
import {PostEditor} from "../../../../components/PostEditor/PostEditor.tsx";
import {useOwnProfile} from "../../../../stores/OwnProfileStore.ts";
import {useFeed} from "../../../../stores/FeedStore.ts";
import {profilesProfileIdPostsGet} from "../../../../api/profiles/profilesProfileIdPostsGet.ts";
import {PostsFeed} from "../../../../components/PostsFeed/PostsFeed.tsx";

type Props = {
    profile: ProfileById;
    events: EventProfile[];
}

export const ProfileFeedColumn: FC<Props> = ({ profile, events }) => {
    const { message } = App.useApp();
    const { feed, addPosts, updateLikes, flushPosts } = useFeed('profile', profile.id);
    const [loading, setLoading] = useState(false);
    const { profile: ownProfile } = useOwnProfile();

    const initFeed = () => {
        flushPosts();
        setLoading(true);
        profilesProfileIdPostsGet(profile.id).then((f) => {
            addPosts(f.results, f.next_page, f.count);
        }).catch((e) => {
            console.error(e);
            void message.error(`Error loading the feed (${JSON.stringify(e)})`);
        }).finally(() => setLoading(false));
    }

    const loadPosts = () => {
        if(feed.posts.length >= feed.count) return;

        setLoading(true);
        return profilesProfileIdPostsGet(profile.id, feed.next).then((f) => {
            addPosts(f.results, f.next_page, f.count);
        }).catch((e) => {
            console.error(e);
            void message.error(`Error loading the feed (${JSON.stringify(e)})`);
        }).finally(() => setLoading(false));
    }

    useEffect(() => {
        if(!feed.next) {
            initFeed();
        }
    }, [initFeed, feed]);

    if(!feed.posts.length) {
        return (
            <EmptyFeed />
        );
    }

    return (
        <Flex vertical gap={16}>
            <Typography.Title level={3}>Publications</Typography.Title>
            {ownProfile?.id === profile.id && (
                <PostEditor
                    target={profile}
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