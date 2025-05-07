import {FC, useState} from "react";
import {EventCommunity, EventProfile} from "../../types/domain.ts";
import {App, Button, Descriptions, Flex, Modal, Popconfirm} from "antd";
import dayjs from "dayjs";
import {dateAsRelativeText} from "../../utils/dateAsRelativeText.ts";
import {isCommunityEvent} from "../../utils/eventGuards.ts";
import {EventSubscribeButton} from "../EventSubscribeButton/EventSubscribeButton.tsx";
import {DeleteOutlined} from "@ant-design/icons";
import {eventsEventIdDelete} from "../../api/events/eventsEventIdDelete.ts";

type Props = {
    event?: EventCommunity | EventProfile;
    onUpdate: VoidFunction;
    onClose: VoidFunction;
}

export const EventModal: FC<Props> = ({ event, onClose, onUpdate }) => {
    const { message } = App.useApp();

    const [deleteLoading, setDeleteLoading] = useState(false);
    const handleDelete = () => {
        setDeleteLoading(true);
        eventsEventIdDelete(event!.id).then(() => {
            void message.success('Event deleted');
            onUpdate();
            onClose();
        }).catch((e) => {
            void message.error(JSON.stringify(e));
            console.error(e);
        }).finally(() => setDeleteLoading(false));
    }

    return (
        <Modal
            title={event?.description}
            open={!!event}
            onCancel={onClose}
            footer={event && (
                <Flex align="center" justify="space-between">
                    {event.is_deleteable ? (
                        <Popconfirm
                            title="Are you sure you want to delete this event?"
                            onConfirm={handleDelete}
                        >
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                                loading={deleteLoading}
                            >Delete</Button>
                        </Popconfirm>
                    ) : <div />}
                    <EventSubscribeButton
                        id={event.id}
                        subscribed={event.is_subscribed}
                        subscribers={event.subscribers_count}
                        onUpdate={onUpdate}
                    />
                </Flex>
            )}
            destroyOnClose
            width={600}
        >
            {event && (
                <Descriptions
                    column={2}
                    items={[
                        { label: 'Location', children: event?.location },
                        { label: 'Date', children: dateAsRelativeText(dayjs(event?.date)) },
                        { label: 'Required materials', children: event?.required_materials },
                        { label: 'Max capacity', children: event?.max_capacity },
                        { label: 'Created at', children: dateAsRelativeText(dayjs(event?.created_at)) },
                        {
                            label: 'Created by',
                            children: isCommunityEvent(event) ? event.community.name : `${event.profile.first_name} ${event.profile.last_name}`
                        }
                    ]}
                />
            )}
        </Modal>
    )
}