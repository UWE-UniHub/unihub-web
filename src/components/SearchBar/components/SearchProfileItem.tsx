import {FC} from "react";
import {Profile} from "../../../types/domain.ts";
import {Flex, Typography} from "antd";
import {ProfileAvatar} from "../../ProfileAvatar/ProfileAvatar.tsx";
import {Link} from "react-router";

type Props = {
    profile: Profile;
}

export const SearchProfileItem: FC<Props> = ({ profile }) => (
    <Link to={`/profile/${profile.id}`}>
        <Flex align="center" gap={8}>
            <ProfileAvatar profile={profile} version={0} />
            <Flex vertical style={{ minWidth: 0 }}>
                <Typography.Text>{profile.first_name} {profile.last_name}</Typography.Text>
                <Typography.Text type="secondary" ellipsis>{profile.bio}</Typography.Text>
            </Flex>
        </Flex>
    </Link>
)