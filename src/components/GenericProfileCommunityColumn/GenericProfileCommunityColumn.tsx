import {FC} from "react";
import {Flex} from "antd";
import {GenericProfileCommunityProps, isGenericCommunityProps, isGenericProfileProps} from "./types.ts";
import {ProfileCommunityInfoCard} from "./components/ProfileCommunityInfoCard/ProfileCommunityInfoCard.tsx";
import {ProfileTypeCards} from "./components/ProfileTypeCards/ProfileTypeCards.tsx";
import {EventCommunity, EventProfile} from "../../types/domain.ts";
import {EventsColumn} from "../EventsColumn/EventsColumn.tsx";
import styles from './GenericProfileCommunityColumn.module.css';
import { StickySidebar } from "../StickySidebar/StickySidebar.tsx";

type Props = GenericProfileCommunityProps & {
    events: (EventProfile | EventCommunity)[];
    avatarVersion: number;
    onUpdate: VoidFunction;
    onEdit: VoidFunction;
    onShowSubscribers?: VoidFunction;
    onShowSubscriptions?: VoidFunction;
    eventsCreatable: boolean;
    onEventCreate: VoidFunction;
};

export const GenericProfileCommunityColumn: FC<Props> = (props) => (
    <Flex vertical gap={16} className={styles.container}>
        {isGenericProfileProps(props) && (
            <ProfileCommunityInfoCard
                {...props}
                type="profile"
                profile={props.profile}
            />
        )}
        {isGenericCommunityProps(props) && (
            <ProfileCommunityInfoCard
                {...props}
                type="community"
                community={props.community}
            />
        )}
        {isGenericProfileProps(props) && <ProfileTypeCards profile={props.profile} />}
        <StickySidebar>
            <EventsColumn
                id={isGenericProfileProps(props) ? props.profile.id : props.community.id}
                events={props.events}
                eventsCreatable={props.eventsCreatable}
                onCreate={props.onEventCreate}
            />
        </StickySidebar>
    </Flex>
)