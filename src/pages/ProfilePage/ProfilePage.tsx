import {FC, useState, useEffect} from "react";
import styles from './ProfilePage.module.css';
import {ProfileFeedColumn} from "./components/ProfileFeedColumn/ProfileFeedColumn.tsx";
import {
    GenericProfileCommunityColumn
} from "../../components/GenericProfileCommunityColumn/GenericProfileCommunityColumn.tsx";
import {useProfileById} from "../../queries/useProfileById.ts";
import {useParams} from "react-router";
import {Spin} from "antd";
import {EditProfileModal} from "./components/EditProfileModal/EditProfileModal.tsx";
import {useProfileFollowers} from "../../queries/useProfileFollowers.ts";
import {useProfileSubscriptions} from "../../queries/useProfileSubscriptions.ts";
import {ProfilesListModal} from "../../components/ProfilesListModal/ProfilesListModal.tsx";
import {useProfileEvents} from "../../queries/useProfileEvents.ts";
import {useOwnProfile} from "../../stores/OwnProfileStore.ts";

export const ProfilePage: FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { profileId } = useParams();
    const { data: profile, refetch } = useProfileById(profileId!);
    const { profile: ownProfile } = useOwnProfile();

    const [editOpen, setEditOpen] = useState(false);
    const [avatarVersion, setAvatarVersion] = useState(0);
    const handleUpdate = () => {
        setAvatarVersion(v => v + 1);
        void refetch();
    }

    const [subscribersOpen, setSubscribersOpen] = useState(false);
    const { data: subscribers } = useProfileFollowers(profileId!, subscribersOpen);

    const [subscriptionsOpen, setSubscriptionsOpen] = useState(false);
    const { data: subscriptions } = useProfileSubscriptions(profileId!, subscriptionsOpen);

    const { data: events, refetch: refetchEvents } = useProfileEvents(profileId!);

    return (
        <div className={styles.container}>
            <Spin spinning={!profile} fullscreen />
            {profile && events && (
                <GenericProfileCommunityColumn
                    type="profile"
                    profile={profile}
                    events={events}
                    onUpdate={refetch}
                    onEdit={() => setEditOpen(true)}
                    avatarVersion={avatarVersion}
                    onShowSubscribers={() => setSubscribersOpen(true)}
                    onShowSubscriptions={() => setSubscriptionsOpen(true)}
                    eventsCreatable={ownProfile?.id === profile.id}
                    onEventCreate={refetchEvents}
                />
            )}
            <div className={styles.feedColumnContainer}>
                {profile && events ? (
                    <ProfileFeedColumn profile={profile} events={events} />
                ) : <Spin />}
            </div>
            <EditProfileModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                onUpdate={handleUpdate}
            />
            <ProfilesListModal
                title="Subscribers"
                profiles={subscribers}
                open={subscribersOpen}
                onClose={() => setSubscribersOpen(false)}
            />
            <ProfilesListModal
                title="Subscriptions"
                profiles={subscriptions}
                open={subscriptionsOpen}
                onClose={() => setSubscriptionsOpen(false)}
            />
        </div>
    )
}