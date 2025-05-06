import {FC} from "react";
import {Card, Flex, Typography} from "antd";
import {PushpinOutlined} from "@ant-design/icons";
import {dateAsRelativeText} from "../../utils/dateAsRelativeText.ts";
import dayjs from "dayjs";
import {Link} from "react-router";
import {EventCommunity, EventProfile} from "../../types/domain.ts";
import styles from './EventCard.module.css'
import {makeEventLink} from "../../utils/makeEventLink.ts";

type Props = {
    event: EventCommunity | EventProfile;
    onClick?: (event: EventCommunity | EventProfile) => void;
}

export const EventCard: FC<Props> = ({ event, onClick }) =>
{
    const eventElement = (
        <Card hoverable onClick={() => onClick?.(event)}>
            <Flex vertical gap={4} style={{ flex: '1 0', minWidth: 0}}>
                <Flex align="center" justify="space-between" gap={8}>
                    <Typography.Title level={5} ellipsis>{event.description}</Typography.Title>
                    <Flex align="center" gap={4}>
                        <PushpinOutlined />
                        <Typography.Text className={styles.location}>{event.location}</Typography.Text>
                    </Flex>
                </Flex>
                <Typography.Text>
                    {dateAsRelativeText(dayjs(event.date))}
                </Typography.Text>
            </Flex>
        </Card>
    );

    if(!onClick) {
        return (
            <Link to={makeEventLink(event)} style={{ minWidth: 0 }}>
                {eventElement}
            </Link>
        )
    }

    return eventElement;
}