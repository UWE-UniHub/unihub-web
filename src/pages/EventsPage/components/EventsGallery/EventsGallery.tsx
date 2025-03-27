import {FC} from "react";
import {EventCommunity, EventProfile} from "../../../../types/domain.ts";
import {Card, Flex, Typography} from "antd";
import {Link} from "react-router";
import {PushpinOutlined} from "@ant-design/icons";
import styles from './EventsGallery.module.css';
import {isCommunityEvent, isProfileEvent} from "../../../../utils/eventGuards.ts";
import dayjs from "dayjs";
import {dateAsRelativeText} from "../../../../utils/dateAsRelativeText.ts";

const makeEventLink = (event: EventCommunity | EventProfile) => {
    if(isCommunityEvent(event))
        return `/community/${event.community.id}?eventId=${event.id}`;
    if(isProfileEvent(event))
        return `/profile/${event.profile.id}?eventId=${event.id}`;
    return '';
}

type Props = {
    events: (EventCommunity | EventProfile)[];
}

export const EventsGallery: FC<Props> = ({ events }) => (
    <div className={styles.container}>
        {events.map((event) => (
            <Link to={makeEventLink(event)} style={{ minWidth: 0 }}>
                <Card key={event.id} hoverable>
                    <Flex vertical gap={4} style={{ flex: '1 0', minWidth: 0}}>
                        <Flex align="center" justify="space-between" gap={8}>
                            <Typography.Title level={5} ellipsis>{event.description}</Typography.Title>
                            <Flex align="center" gap={4}>
                                <PushpinOutlined />
                                <Typography.Text>{event.location}</Typography.Text>
                            </Flex>
                        </Flex>
                        <Typography.Text>
                            {dateAsRelativeText(dayjs(event.date))}
                        </Typography.Text>
                    </Flex>
                </Card>
            </Link>
        ))}
    </div>
)