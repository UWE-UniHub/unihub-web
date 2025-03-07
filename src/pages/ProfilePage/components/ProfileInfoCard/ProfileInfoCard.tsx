import {FC, useState} from "react";
import {Card, Flex, Typography} from "antd";
import {ProfileById} from "../../../../types/domain.ts";
import {ProfileAvatar} from "../../../../components/ProfileAvatar/ProfileAvatar.tsx";
import {useOwnProfile} from "../../../../stores/OwnProfileStore.ts";
import {EditProfileModal} from "../EditProfileModal/EditProfileModal.tsx";
import {SubscribeButton} from "../SubscribeButton/SubscribeButton.tsx";

type Props = {
    profile: ProfileById;
    onProfileUpdate: VoidFunction;
}

export const ProfileInfoCard: FC<Props> = ({ profile, onProfileUpdate }) => {
    const { profile: ownProfile } = useOwnProfile();
    const isOwnProfile = profile.id === ownProfile?.id;

    const [avatarVersion, setAvatarVersion] = useState(0);
    const handleUpdate = () => {
        onProfileUpdate();
        setAvatarVersion((v) => v + 1);
    }

    return (
        <Card>
            <Flex vertical align="center" gap={16}>
                <Flex vertical align="center" gap={8}>
                    <ProfileAvatar
                        profile={profile}
                        version={avatarVersion}
                        size={128}
                    />
                    <Typography.Title level={3}>{profile.first_name} {profile.last_name}</Typography.Title>
                    <Flex gap={16}>
                        <Flex gap={4} align="baseline">
                            <Typography.Title level={5}>{profile.subscribers}</Typography.Title>
                            <Typography.Text type="secondary">subscribers</Typography.Text>
                        </Flex>
                        <Flex gap={4} align="baseline">
                            <Typography.Title level={5}>{profile.subscriptions}</Typography.Title>
                            <Typography.Text type="secondary">subscriptions</Typography.Text>
                        </Flex>
                    </Flex>
                </Flex>
                {isOwnProfile ? (
                    <EditProfileModal onUpdate={handleUpdate} />
                ) : (
                    <SubscribeButton
                        profileId={profile.id}
                        subscribed={profile.is_subscribed}
                        onUpdate={handleUpdate}
                    />
                )}
                <Typography.Paragraph style={{ marginBottom: 0 }}>
                    {profile.bio}
                </Typography.Paragraph>
            </Flex>
        </Card>
    )
}