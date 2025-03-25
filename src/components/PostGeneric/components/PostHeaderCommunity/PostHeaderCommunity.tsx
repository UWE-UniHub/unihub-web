import {FC} from "react";
import {Community} from "../../../../types/domain.ts";
import {Flex, Typography} from "antd";
import {dateAsRelativeText} from "../../../../utils/dateAsRelativeText.ts";
import dayjs from "dayjs";
import {CommunityAvatar} from "../../../CommunityAvatar/CommunityAvatar.tsx";

type Props = {
    community: Community;
    createdAt: string;
}

export const PostHeaderCommunity: FC<Props> = ({ community, createdAt }) => (
    <Flex align="center" gap={16}>
        <CommunityAvatar community={community} version={0} size={48} />
        <Flex vertical gap={2}>
            <Typography.Title level={5}>{community.name}</Typography.Title>
            <Typography.Text type="secondary">{dateAsRelativeText(dayjs(createdAt))}</Typography.Text>
        </Flex>
    </Flex>
)