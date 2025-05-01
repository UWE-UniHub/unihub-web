import {FC} from "react";
import {EventCommunity, EventProfile} from "../../types/domain.ts";
import {Descriptions, Modal} from "antd";
import dayjs from "dayjs";
import {dateAsRelativeText} from "../../utils/dateAsRelativeText.ts";
import {isCommunityEvent} from "../../utils/eventGuards.ts";
import {EventSubscribeButton} from "../EventSubscribeButton/EventSubscribeButton.tsx";

type Props = {
    event?: EventCommunity | EventProfile;
    onUpdate: VoidFunction;
    onClose: VoidFunction;
}

export const EventModal: FC<Props> = ({ event, onClose, onUpdate }) => (
    <Modal
        title={event?.description}
        open={!!event}
        onCancel={onClose}
        footer={event && (
            <EventSubscribeButton id={event.id} subscribed={event.is_subscribed} onUpdate={onUpdate} />
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