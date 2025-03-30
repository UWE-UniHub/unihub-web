import {FC, useState} from "react";
import styles from './CommunityPage.module.css';
import {
    GenericProfileCommunityColumn
} from "../../components/GenericProfileCommunityColumn/GenericProfileCommunityColumn.tsx";
import {useParams} from "react-router";
import {Spin} from "antd";
import {useCommunityById} from "../../queries/useCommunityById.ts";
import {CommunityFeedColumn} from "./components/CommunityFeedColumn/CommunityFeedColumn.tsx";
import {EditCommunityModal} from "./components/EditCommunityModal/EditCommunityModal.tsx";
import {useCommunityFollowers} from "../../queries/useCommunityFollowers.ts";
import {ProfilesListModal} from "../../components/ProfilesListModal/ProfilesListModal.tsx";
import {useCommunityEvents} from "../../queries/useCommunityEvents.ts";

export const CommunityPage: FC = () => {
    const { communityId } = useParams();
    const { data: community, refetch } = useCommunityById(communityId!);

    const [editOpen, setEditOpen] = useState(false);
    const [avatarVersion, setAvatarVersion] = useState(0);
    const handleUpdate = () => {
        setAvatarVersion(v => v + 1);
        void refetch();
    }

    const [subscribersOpen, setSubscribersOpen] = useState(false);
    const { data: subscribers } = useCommunityFollowers(communityId!, subscribersOpen);

    const { data: events, refetch: refetchEvents } = useCommunityEvents(communityId!);

    return (
        <div className={styles.container}>
            <Spin spinning={!community} fullscreen />
            {community && events && (
                <GenericProfileCommunityColumn
                    type="community"
                    community={community}
                    events={events}
                    onUpdate={refetch}
                    onEdit={() => setEditOpen(true)}
                    avatarVersion={avatarVersion}
                    onShowSubscribers={() => setSubscribersOpen(true)}
                    eventsCreatable={community.is_admin}
                    onEventCreate={refetchEvents}
                />
            )}
            <div className={styles.feedColumnContainer}>
                {community && events ? (
                    <CommunityFeedColumn community={community} events={events} />
                ) : <Spin />}
            </div>
            {community && (
                <EditCommunityModal
                    open={editOpen}
                    community={community}
                    onClose={() => setEditOpen(false)}
                    onUpdate={handleUpdate}
                />
            )}
            <ProfilesListModal
                title="Subscribers"
                profiles={subscribers}
                open={subscribersOpen}
                onClose={() => setSubscribersOpen(false)}
            />
        </div>
    )
}