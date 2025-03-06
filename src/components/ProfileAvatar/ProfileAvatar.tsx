import {FC} from "react";
import {Avatar, AvatarProps} from "antd";
import {getProfileAvatarUrl} from "../../utils/getProfileAvatarUrl.ts";
import {stringToColor} from "../../utils/stringToColor.ts";
import {Profile} from "../../types/domain.ts";

type Props = {
    profile: Profile;
} & AvatarProps;

export const ProfileAvatar: FC<Props> = ({ profile, ...rest }) => (
    <Avatar
        src={`${getProfileAvatarUrl(profile.id)}?${new Date().getTime()}`}
        style={{ backgroundColor: stringToColor(`${profile.first_name[0]}${profile.last_name[0]}`) }}
        {...rest}
    >
        {profile.first_name[0]}{profile.last_name[0]}
    </Avatar>
)