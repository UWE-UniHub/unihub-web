import {FC} from "react";
import {Profile} from "../../../../types/domain.ts";
import {Flex, Typography} from "antd";
import {ProfileAvatar} from "../../../ProfileAvatar/ProfileAvatar.tsx";
import {dateAsRelativeText} from "../../../../utils/dateAsRelativeText.ts";
import dayjs from "dayjs";
import {StaffBadge} from "../../../StaffBadge/StaffBadge.tsx";
import {Link} from "react-router";

type Props = {
    profile: Profile;
    createdAt: string;
}

export const PostHeaderProfile: FC<Props> = ({ profile, createdAt }) => (
    <Flex align="center" gap={16}>
        <ProfileAvatar profile={profile} version={0} size={48} />
        <Flex vertical gap={2}>
            <Flex align="center" gap={6}>
                <Link to={`/profile/${profile.id}`}>
                    <Typography.Title level={5}>{profile.first_name} {profile.last_name}</Typography.Title>
                </Link>
                {profile.staff && <StaffBadge />}
            </Flex>
            <Typography.Text type="secondary">{dateAsRelativeText(dayjs(createdAt))}</Typography.Text>
        </Flex>
    </Flex>
)