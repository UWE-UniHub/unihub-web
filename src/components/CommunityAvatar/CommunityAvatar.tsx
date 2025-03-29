import {FC} from "react";
import {Avatar, AvatarProps} from "antd";
import {stringToColor} from "../../utils/stringToColor.ts";
import {Community} from "../../types/domain.ts";
import {getCommunityAvatarUrl} from "../../utils/getCommunityAvatarUrl.ts";

type Props = {
    community: Community;
    version: number;
} & AvatarProps;

export const CommunityAvatar: FC<Props> = ({ community, version, ...rest }) => (
    <Avatar
        src={`${getCommunityAvatarUrl(community.id)}?${version}`}
        style={{ backgroundColor: stringToColor(`${community.name[0]}`), flexShrink: 0 }}
        {...rest}
    >
        {community.name[0]}
    </Avatar>
)