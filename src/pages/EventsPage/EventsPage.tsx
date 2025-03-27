import {FC} from "react";
import {useEvents} from "../../queries/useEvents.ts";
import {Flex, Spin, Typography} from "antd";
import {EventsGallery} from "./components/EventsGallery/EventsGallery.tsx";

export const EventsPage: FC = () => {
    const { data: events } = useEvents();

    return (
        <Flex vertical gap={16} flex="1 0">
            <Flex align="center" justify="space-between">
                <Typography.Title level={3}>Events</Typography.Title>
            </Flex>
            {events ? (
                <EventsGallery events={events} />
            ) : (
                <Flex align="center" justify="center" flex="1 0">
                    <Spin />
                </Flex>
            )}
        </Flex>
    );
}