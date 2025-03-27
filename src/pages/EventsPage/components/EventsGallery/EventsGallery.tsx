import {FC} from "react";
import {EventCommunity, EventProfile} from "../../../../types/domain.ts";
import styles from './EventsGallery.module.css';
import {EventCard} from "../../../../components/EventCard/EventCard.tsx";

type Props = {
    events: (EventCommunity | EventProfile)[];
}

export const EventsGallery: FC<Props> = ({ events }) => (
    <div className={styles.container}>
        {events.map((event) => <EventCard key={event.id} event={event} />)}
    </div>
)