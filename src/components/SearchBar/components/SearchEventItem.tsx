import {FC} from "react";
import {EventCommunity, EventProfile} from "../../../types/domain.ts";
import {Flex, Typography} from "antd";
import {ProfileAvatar} from "../../ProfileAvatar/ProfileAvatar.tsx";
import {CommunityAvatar} from "../../CommunityAvatar/CommunityAvatar.tsx";
import {dateAsRelativeText} from "../../../utils/dateAsRelativeText.ts";
import dayjs from "dayjs";
import {isCommunityEvent} from "../../../utils/eventGuards.ts";
import {Link} from "react-router";
import {makeEventLink} from "../../../utils/makeEventLink.ts";

type Props = {
    event: EventProfile | EventCommunity;
}

export const SearchEventItem: FC<Props> = ({ event }) => (
    <Link to={makeEventLink(event)}>
        <Flex align="center" gap={8}>
            {isCommunityEvent(event) ? (
                <CommunityAvatar community={event.community} version={0} />
            ) : (
                <ProfileAvatar profile={event.profile} version={0} />
            )}
            <Flex vertical style={{ minWidth: 0 }}>
                <Typography.Text>
                    {isCommunityEvent(event) ? event.community.name : `${event.profile.first_name} ${event.profile.last_name}`}
                </Typography.Text>
                <Typography.Text type="secondary" ellipsis>{event.description}</Typography.Text>
                <Typography.Text type="secondary">
                    {dateAsRelativeText(dayjs(event.date))}&nbsp;|&nbsp;{event.location}
                </Typography.Text>
            </Flex>
        </Flex>
    </Link>
)