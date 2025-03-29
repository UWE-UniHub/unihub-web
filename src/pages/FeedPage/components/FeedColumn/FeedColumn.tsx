import {FC} from "react";
import {PostCommunity, PostProfile} from "../../../../types/domain.ts";
import {EmptyFeed} from "../../../../components/EmptyFeed/EmptyFeed.tsx";
import {Flex} from "antd";
import {PostGeneric} from "../../../../components/PostGeneric/PostGeneric.tsx";

type Props = {
    posts: (PostProfile | PostCommunity)[];
    onUpdate: VoidFunction;
}

export const FeedColumn: FC<Props> = ({ posts, onUpdate }) => {
    if(!posts?.length) {
        return (
            <EmptyFeed />
        );
    }

    return (
        <Flex vertical gap={16}>
            {posts.map((post) => <PostGeneric key={post.id} post={post} onPostUpdate={onUpdate} />)}
        </Flex>
    )
}