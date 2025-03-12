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

export const CommunityPage: FC = () => {
    const { communityId } = useParams();
    const { data: community, refetch } = useCommunityById(communityId!);

    const [editOpen, setEditOpen] = useState(false);
    const [avatarVersion, setAvatarVersion] = useState(0);
    const handleUpdate = () => {
        setAvatarVersion(v => v + 1);
        void refetch();
    }

    return (
        <div className={styles.container}>
            <Spin spinning={!community} fullscreen />
            {community && (
                <GenericProfileCommunityColumn
                    type="community"
                    community={community}
                    onUpdate={refetch}
                    onEdit={() => setEditOpen(true)}
                    avatarVersion={avatarVersion}
                />
            )}
            <div className={styles.feedColumnContainer}>
                <CommunityFeedColumn />
            </div>
            {community && (
                <EditCommunityModal
                    open={editOpen}
                    community={community}
                    onClose={() => setEditOpen(false)}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    )
}