import {FC} from "react";
import {Flex, Typography} from "antd";
import styles from './EventPreview.module.css';
import dayjs from "dayjs";
import {dateAsRelativeText} from "../../utils/dateAsRelativeText.ts";
import {EventCommunity, EventProfile} from "../../types/domain.ts";
import cx from 'classnames';
import {useNavigate} from "react-router";
import {isProfileEvent} from "../../utils/eventGuards.ts";
import { MouseEvent } from "react";

type Props = {
    event: EventProfile | EventCommunity;
    clickable?: boolean;
}

export const EventPreview: FC<Props> = ({ event, clickable }) => {
    const navigate = useNavigate();

    const handleClick = (e: MouseEvent) => {
        if(!clickable) return;

        e.stopPropagation();
        navigate(isProfileEvent(event) ?
            `/profile/${event.profile.id}?eventId=${event.id}` :
            `/community/${event.community.id}?eventId=${event.id}`
        );
    }

    return (
        <Flex
            align="center"
            justify="space-between"
            className={cx(styles.container, { [styles.clickable]: clickable })}
            onClick={handleClick}
        >
            <Typography.Text>{event.description}</Typography.Text>
            <Typography.Text type="secondary">
                {dateAsRelativeText(dayjs(event.date))}
            </Typography.Text>
        </Flex>
    )
}