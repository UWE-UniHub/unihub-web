import {FC} from "react";
import {Community} from "../../../types/domain.ts";
import {Flex, Typography} from "antd";
import {CommunityAvatar} from "../../CommunityAvatar/CommunityAvatar.tsx";
import {Link} from "react-router";

type Props = {
    community: Community;
}

export const SearchCommunityItem: FC<Props> = ({ community }) => (
    <Link to={`/community/${community.id}`}>
        <Flex align="center" gap={8}>
            <CommunityAvatar community={community} version={0} />
            <Flex vertical style={{ minWidth: 0 }}>
                <Typography.Text>{community.name}</Typography.Text>
                <Typography.Text type="secondary" ellipsis>{community.bio}</Typography.Text>
            </Flex>
        </Flex>
    </Link>
)