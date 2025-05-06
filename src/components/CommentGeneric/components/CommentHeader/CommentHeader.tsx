import {FC} from "react";
import {Profile} from "../../../../types/domain.ts";
import {ProfileAvatar} from "../../../ProfileAvatar/ProfileAvatar.tsx";
import {Flex, Typography} from "antd";
import {Link} from "react-router";
import {StaffBadge} from "../../../StaffBadge/StaffBadge.tsx";
import {dateAsRelativeText} from "../../../../utils/dateAsRelativeText.ts";
import dayjs from "dayjs";

type Props = {
    author: Profile;
    createdAt: string;
}

export const CommentHeader: FC<Props> = ({ author, createdAt }) => (
    <Flex align="center" gap={16}>
        <ProfileAvatar profile={author} version={0} size={48} />
        <Flex vertical gap={2}>
            <Flex align="center" gap={6}>
                <Link to={`/profile/${author.id}`}>
                    <Typography.Title level={5}>{author.first_name} {author.last_name}</Typography.Title>
                </Link>
                {author.staff && <StaffBadge />}
            </Flex>
            <Typography.Text type="secondary">{dateAsRelativeText(dayjs(createdAt))}</Typography.Text>
        </Flex>
    </Flex>
)