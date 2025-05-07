import {FC, useEffect, useState} from "react";
import {useComments} from "../../stores/CommentsFeedStore.ts";
import {postsPostIdCommentsGet} from "../../api/posts/postsPostIdCommentsGet.ts";
import {App, Flex, Typography} from "antd";
import {CommentsFeedPure} from "./CommentsFeedPure.tsx";
import {EmptyFeed} from "../EmptyFeed/EmptyFeed.tsx";
import {useOwnProfile} from "../../stores/OwnProfileStore.ts";
import {PostEditor} from "../PostEditor/PostEditor.tsx";

type Props = {
    postId: string;
}

export const CommentsFeed: FC<Props> = ({ postId }) => {
    const { message } = App.useApp();
    const {
        feed,
        addComments,
        updateComment,
        deleteComment,
        flushComments
    } = useComments(postId);
    const [loading, setLoading] = useState(false);
    const { profile: ownProfile } = useOwnProfile();

    const initFeed = () => {
        setTimeout(() => {
            setLoading(true);
            postsPostIdCommentsGet(postId).then((f) => {
                flushComments();
                addComments(f.results, f.next_page, f.count);
            }).catch((e) => {
                console.error(e);
                void message.error(`Error loading the feed (${JSON.stringify(e)})`);
            }).finally(() => setLoading(false));
        })
    }

    const loadComments = () => {
        if(feed.comments.length >= feed.count) return;

        setLoading(true);
        return postsPostIdCommentsGet(postId, feed.next).then((f) => {
            addComments(f.results, f.next_page, f.count);
        }).catch((e) => {
            console.error(e);
            void message.error(`Error loading the feed (${JSON.stringify(e)})`);
        }).finally(() => setLoading(false));
    }

    useEffect(() => {
        if(!feed.init) {
            initFeed();
        }
    }, [feed.init, initFeed]);

    return (
        <Flex vertical gap={16}>
            <Typography.Title level={3}>Comments</Typography.Title>
            {ownProfile && (
                <PostEditor target={postId} events={[]} onPost={initFeed} />
            )}
            {feed.comments.length ? (
                <CommentsFeedPure
                    comments={feed.comments}
                    loading={loading}
                    onScroll={loadComments}
                    onCommentEdit={updateComment}
                    onCommentDelete={deleteComment}
                />
            ) : <EmptyFeed comments />}
        </Flex>
    )
}