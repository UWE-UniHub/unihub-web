import {FC} from "react";
import {Community} from "../../../../types/domain.ts";
import {Flex, Typography} from "antd";
import {dateAsRelativeText} from "../../../../utils/dateAsRelativeText.ts";
import dayjs from "dayjs";
import {CommunityAvatar} from "../../../CommunityAvatar/CommunityAvatar.tsx";
import {Link} from "react-router";
import {PostEditableDropdown} from "../../../PostEditableDropdown/PostEditableDropdown.tsx";

type Props = {
    editable: boolean;
    community: Community;
    createdAt: string;
    onEdit: VoidFunction;
    onDelete: VoidFunction;
}

export const PostHeaderCommunity: FC<Props> = ({ editable, community, createdAt, onEdit, onDelete }) => (
    <Flex align="center" justify="space-between">
        <Flex align="center" gap={16}>
            <CommunityAvatar community={community} version={0} size={48} />
            <Flex vertical gap={2}>
                <Link to={`/community/${community.id}`}>
                    <Typography.Title level={5}>{community.name}</Typography.Title>
                </Link>
                <Typography.Text type="secondary">{dateAsRelativeText(dayjs(createdAt))}</Typography.Text>
            </Flex>
        </Flex>
        {editable && <PostEditableDropdown onEdit={onEdit} onDelete={onDelete} />}
    </Flex>
)