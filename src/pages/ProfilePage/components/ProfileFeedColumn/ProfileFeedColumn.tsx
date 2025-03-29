import {FC} from "react";
import {EmptyFeed} from "../../../../components/EmptyFeed/EmptyFeed.tsx";
import {EventProfile, ProfileById} from "../../../../types/domain.ts";
import {useProfilePosts} from "../../../../queries/useProfilePosts.ts";
import {Flex, Typography} from "antd";
import {PostGeneric} from "../../../../components/PostGeneric/PostGeneric.tsx";
import {PostEditor} from "../../../../components/PostEditor/PostEditor.tsx";
import {useOwnProfile} from "../../../../stores/OwnProfileStore.ts";

type Props = {
    profile: ProfileById;
    events: EventProfile[];
}

export const ProfileFeedColumn: FC<Props> = ({ profile, events }) => {
    // FIXME fix to fit feed specs with limit and cursor (separate Feed component)
    const { data: posts, refetch } = useProfilePosts(profile.id);
    const { profile: ownProfile } = useOwnProfile();

    if(!posts?.length) {
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
                    onPost={refetch}
                />
            )}
            {posts.map((post) => <PostGeneric key={post.id} post={post} onPostUpdate={refetch} />)}
        </Flex>
    )
}