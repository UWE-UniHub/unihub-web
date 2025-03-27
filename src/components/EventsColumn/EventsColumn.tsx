import {FC, useEffect, useState} from "react";
import {EventCommunity, EventProfile} from "../../types/domain.ts";
import {Flex, Typography} from "antd";
import {EventCard} from "../EventCard/EventCard.tsx";
import {EventModal} from "../EventModal/EventModal.tsx";
import {useSearchParams} from "react-router";

type Props = {
    events: (EventCommunity | EventProfile)[];
}

export const EventsColumn: FC<Props> = ({ events }) => {
    const [searchParams] = useSearchParams();
    const [eventModal, setEventModal] = useState<EventCommunity | EventProfile>();

    useEffect(() => {
        if(searchParams.has('eventId')) {
            setEventModal(events.find(({ id }) => id === searchParams.get('eventId')));
        }
    }, [searchParams, events]);

    if(!events.length) {
        return null;
    }

    return (
        <Flex vertical gap={16}>
            <Typography.Title level={4}>Events</Typography.Title>
            {events.map((event) => (
                <EventCard
                    event={event}
                    key={event.id}
                    onClick={() => setEventModal(event)}
                />
            ))}
            <EventModal event={eventModal} onClose={() => setEventModal(undefined)} />
        </Flex>
    )
}