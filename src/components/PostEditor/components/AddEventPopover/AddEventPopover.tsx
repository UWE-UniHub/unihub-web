import {FC, useState} from "react";
import {EventCommunity, EventProfile} from "../../../../types/domain.ts";
import {Button, Popover, Select, Tooltip} from "antd";
import {CalendarOutlined} from "@ant-design/icons";
import styles from './AddEventPopover.module.css';

type Props = {
    events: (EventProfile | EventCommunity)[];
    eventId: string | undefined;
    setEventId: (value: string | undefined) => void;
}

export const AddEventPopover: FC<Props> = ({ events, eventId, setEventId }) => {
    const [open, setOpen] = useState(false);

    if(eventId) {
        return (
            <Button
                danger
                icon={<CalendarOutlined />}
                onClick={() => setEventId(undefined)}
            >Remove</Button>
        )
    }

    const handleSelect = (value: string) => {
        setEventId(value);
        setOpen(false);
    }

    const content = (
        <Select
            showSearch
            optionFilterProp="label"
            options={events.map(({ id, description }) => ({
                value: id,
                label: description
            }))}
            onChange={handleSelect}
            className={styles.select}
            placeholder="Search for event..."
        />
    )

    return (
        <Popover
            trigger="click"
            open={open}
            onOpenChange={setOpen}
            content={content}
            classNames={{ body: styles.content }}
        >
            <Tooltip title="Add event" placement="bottom">
                <Button icon={<CalendarOutlined />} />
            </Tooltip>
        </Popover>
    )
}