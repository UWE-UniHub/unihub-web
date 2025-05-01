import {FC, useEffect, useState} from "react";
import {EventCommunity, EventProfile} from "../../types/domain.ts";
import {Empty, Flex, Typography} from "antd";
import {EventCard} from "../EventCard/EventCard.tsx";
import {EventModal} from "../EventModal/EventModal.tsx";
import {useSearchParams} from "react-router";
import {CreateEventModal} from "../CreateEventModal/CreateEventModal.tsx";
import {isProfileEvent} from "../../utils/eventGuards.ts";

type Props = {
    id: string;
    events: (EventCommunity | EventProfile)[];
    eventsCreatable: boolean;
    onCreate: VoidFunction;
}

export const EventsColumn: FC<Props> = ({ id, events, eventsCreatable, onCreate }) => {
    const [searchParams] = useSearchParams();
    const [eventModal, setEventModal] = useState<EventCommunity | EventProfile>();

    useEffect(() => {
        if(searchParams.has('eventId')) {
            setEventModal(events.find(({ id }) => id === searchParams.get('eventId')));
        }
    }, [searchParams, events]);

    return (
        <Flex vertical gap={16}>
            <Flex align="center" justify="space-between">
                <Typography.Title level={4}>Events</Typography.Title>
                {eventsCreatable && (
                    <CreateEventModal
                        type={events[0] && isProfileEvent(events[0]) ? 'profile' : 'community'}
                        id={id}
                        onCreate={onCreate}
                    />
                )}
            </Flex>
            {events.length ? events.map((event) => (
                <EventCard
                    event={event}
                    key={event.id}
                    onClick={() => setEventModal(event)}
                />
            )) : (
                <Empty />
            )}
            <EventModal event={eventModal} onClose={() => setEventModal(undefined)} />
        </Flex>
    )
}