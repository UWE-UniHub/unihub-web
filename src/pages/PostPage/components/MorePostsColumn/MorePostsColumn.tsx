import {FC} from "react";
import {Card, Flex, Typography} from "antd";
import {isCommunityPost, isProfilePost} from "../../../../components/PostGeneric/utils/postGuards.ts";
import {PostCommunity, PostProfile} from "../../../../types/domain.ts";
import {useProfilePosts} from "../../../../queries/useProfilePosts.ts";
import {useCommunityPosts} from "../../../../queries/useCommunityPosts.ts";
import {useNavigate} from "react-router";
import dayjs from "dayjs";
import {dateAsRelativeText} from "../../../../utils/dateAsRelativeText.ts";

type Props = {
    post: PostCommunity | PostProfile
}

export const MorePostsColumn: FC<Props> = ({ post }) => {
    const navigate = useNavigate();

    const { data: profilePosts } = useProfilePosts(
        isProfilePost(post) ? post.profile.id : '', !isProfilePost(post)
    );

    const { data: communityPosts } = useCommunityPosts(
        isCommunityPost(post) ? post.community.id : '', !isCommunityPost(post)
    );

    const handlePostClick = (post: PostProfile | PostCommunity) => {
        if(isProfilePost(post)) navigate(`/profile/${post.profile.id}/${post.id}`);
        if(isCommunityPost(post)) navigate(`/community/${post.community.id}/${post.id}`);
    }

    const filteredPosts = (
        isProfilePost(post) ?
            profilePosts :
            communityPosts
    )?.filter(({ id }) =>
        post.id !== id
    ).slice(0, 3);

    return (
        <Flex vertical gap={8}>
            <Typography.Title level={4}>
                More posts from {isProfilePost(post) ?
                `${post.profile.first_name} ${post.profile.last_name}` :
                post.community.name
            }
            </Typography.Title>
            {filteredPosts?.map((post) => (
                <Card hoverable onClick={() => handlePostClick(post)}>
                    <Typography.Paragraph ellipsis={{ rows: 5 }}>
                        {post.content}
                    </Typography.Paragraph>
                    <Typography.Text type="secondary">
                        {dateAsRelativeText(dayjs(post.created_at))}
                    </Typography.Text>
                </Card>
            ))}
        </Flex>
    )
}