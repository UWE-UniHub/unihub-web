import {FC} from "react";
import {PostCommunity, PostProfile} from "../../../types/domain.ts";
import {Flex, Typography} from "antd";
import {ProfileAvatar} from "../../ProfileAvatar/ProfileAvatar.tsx";
import {isCommunityPost, isProfilePost} from "../../PostGeneric/utils/postGuards.ts";
import {CommunityAvatar} from "../../CommunityAvatar/CommunityAvatar.tsx";
import {dateAsRelativeText} from "../../../utils/dateAsRelativeText.ts";
import dayjs from "dayjs";
import {Link} from "react-router";

type Props = {
    post: PostProfile | PostCommunity;
}

export const SearchPostItem: FC<Props> = ({ post }) => (
    <Link to={isProfilePost(post) ? `/profile/${post.profile.id}/${post.id}` : `/community/${post.community.id}/${post.id}`}>
        <Flex align="center" gap={8}>
            {isCommunityPost(post) ? (
                <CommunityAvatar community={post.community} version={0} />
            ) : (
                <ProfileAvatar profile={post.profile} version={0} />
            )}
            <Flex vertical>
                <Typography.Text>
                    {isCommunityPost(post) ? post.community.name : `${post.profile.first_name} ${post.profile.last_name}`}
                </Typography.Text>
                <Typography.Text type="secondary" ellipsis>{post.content}</Typography.Text>
                <Typography.Text type="secondary">{dateAsRelativeText(dayjs(post.created_at))}</Typography.Text>
            </Flex>
        </Flex>
    </Link>
)