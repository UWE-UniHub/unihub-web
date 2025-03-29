import {FC} from "react";
import {Avatar, AvatarProps} from "antd";
import {getProfileAvatarUrl} from "../../utils/getProfileAvatarUrl.ts";
import {stringToColor} from "../../utils/stringToColor.ts";
import {Profile} from "../../types/domain.ts";

type Props = {
    profile: Profile;
    version: number;
} & AvatarProps;

export const ProfileAvatar: FC<Props> = ({ profile, version, ...rest }) => (
    <Avatar
        src={`${getProfileAvatarUrl(profile.id)}?${version}`}
        style={{ backgroundColor: stringToColor(`${profile.first_name[0]}${profile.last_name[0]}`), flexShrink: 0 }}
        {...rest}
    >
        {profile.first_name[0]}{profile.last_name[0]}
    </Avatar>
)