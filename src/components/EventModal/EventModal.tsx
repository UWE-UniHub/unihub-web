import {FC} from "react";
import {EventCommunity, EventProfile} from "../../types/domain.ts";
import {Descriptions, Modal} from "antd";
import dayjs from "dayjs";
import {dateAsRelativeText} from "../../utils/dateAsRelativeText.ts";
import {isCommunityEvent} from "../../utils/eventGuards.ts";

type Props = {
    event?: EventCommunity | EventProfile;
    onClose: VoidFunction;
}

export const EventModal: FC<Props> = ({ event, onClose }) => {
    return (
        <Modal
            title={event?.description}
            open={!!event}
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >
            {event && (
                <Descriptions
                    column={2}
                    items={[
                        { label: 'Location', children: event?.location },
                        { label: 'Date', children: dateAsRelativeText(dayjs(event?.date)) },
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