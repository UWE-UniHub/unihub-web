import {FC} from "react";
import {EventCommunity, EventProfile} from "../../../../types/domain.ts";
import {Flex, Typography} from "antd";
import styles from './EventPreview.module.css';
import {dateAsRelativeText} from "../../../../utils/dateAsRelativeText.ts";
import dayjs from "dayjs";

type Props = {
    event: EventProfile | EventCommunity;
}

export const EventPreview: FC<Props> = ({ event }) => {
    return (
        <Flex align="center" justify="space-between" className={styles.container}>
            <Typography.Text>{event.description}</Typography.Text>
            <Typography.Text type="secondary">
                {dateAsRelativeText(dayjs(event.date))}
            </Typography.Text>
        </Flex>
    )
}