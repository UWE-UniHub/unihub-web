import {FC} from "react";
import {EmptyFeed} from "../../../../components/EmptyFeed/EmptyFeed.tsx";
import {ProfileById} from "../../../../types/domain.ts";
import {useProfilePosts} from "../../../../queries/useProfilePosts.ts";
import {Flex, Typography} from "antd";
import {PostGeneric} from "../../../../components/PostGeneric/PostGeneric.tsx";

type Props = {
    profile: ProfileById;
}

export const ProfileFeedColumn: FC<Props> = ({ profile }) => {
    // FIXME fix to fit feed specs with limit and cursor (separate Feed component)
    const { data: posts, refetch } = useProfilePosts(profile.id);

    if(!posts?.length) {
        return (
            <EmptyFeed />
        );
    }

    return (
        <Flex vertical gap={16}>
            <Typography.Title level={3}>Publications</Typography.Title>
            {posts.map((post) => <PostGeneric key={post.id} post={post} onPostUpdate={refetch} />)}
        </Flex>
    )
}