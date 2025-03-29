import {FC} from "react";
import {EmptyFeed} from "../../../../components/EmptyFeed/EmptyFeed.tsx";
import {useCommunityPosts} from "../../../../queries/useCommunityPosts.ts";
import {CommunityDetailed, EventCommunity} from "../../../../types/domain.ts";
import {Flex, Typography} from "antd";
import {PostEditor} from "../../../../components/PostEditor/PostEditor.tsx";
import {PostGeneric} from "../../../../components/PostGeneric/PostGeneric.tsx";

type Props = {
    community: CommunityDetailed;
    events: EventCommunity[];
}

export const CommunityFeedColumn: FC<Props> = ({ community, events }) => {
    // FIXME fix to fit feed specs with limit and cursor (separate Feed component)
    const { data: posts, refetch } = useCommunityPosts(community.id);

    if(!posts?.length) {
        return (
            <EmptyFeed />
        );
    }

    return (
        <Flex vertical gap={16}>
            <Typography.Title level={3}>Publications</Typography.Title>
            {community.is_admin && (
                <PostEditor
                    target={community}
                    events={events}
                    onPost={refetch}
                />
            )}
            {posts.map((post) => <PostGeneric key={post.id} post={post} onPostUpdate={refetch} />)}
        </Flex>
    )
}