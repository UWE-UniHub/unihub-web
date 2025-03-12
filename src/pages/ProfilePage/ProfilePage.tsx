import {FC, useState} from "react";
import styles from './ProfilePage.module.css';
import {ProfileFeedColumn} from "./components/ProfileFeedColumn/ProfileFeedColumn.tsx";
import {
    GenericProfileCommunityColumn
} from "../../components/GenericProfileCommunityColumn/GenericProfileCommunityColumn.tsx";
import {useProfileById} from "../../queries/useProfileById.ts";
import {useParams} from "react-router";
import {Spin} from "antd";
import {EditProfileModal} from "./components/EditProfileModal/EditProfileModal.tsx";

export const ProfilePage: FC = () => {
    const { profileId } = useParams();
    const { data: profile, refetch } = useProfileById(profileId!);

    const [editOpen, setEditOpen] = useState(false);
    const [avatarVersion, setAvatarVersion] = useState(0);
    const handleUpdate = () => {
        setAvatarVersion(v => v + 1);
        void refetch();
    }

    return (
        <div className={styles.container}>
            <Spin spinning={!profile} fullscreen />
            {profile && (
                <GenericProfileCommunityColumn
                    type="profile"
                    profile={profile}
                    onUpdate={refetch}
                    onEdit={() => setEditOpen(true)}
                    avatarVersion={avatarVersion}
                />
            )}
            <div className={styles.feedColumnContainer}>
                <ProfileFeedColumn />
            </div>
            <EditProfileModal
                open={editOpen}
                onClose={() => setEditOpen(false)}
                onUpdate={handleUpdate}
            />
        </div>
    )
}