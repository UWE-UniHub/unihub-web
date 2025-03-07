import {FC, useState} from "react";
import {Button, Card, Flex, Typography} from "antd";
import {Profile} from "../../../../types/domain.ts";
import {ProfileAvatar} from "../../../../components/ProfileAvatar/ProfileAvatar.tsx";
import {useOwnProfile} from "../../../../stores/OwnProfileStore.ts";
import {EditProfileModal} from "../EditProfileModal/EditProfileModal.tsx";

type Props = {
    profile: Profile;
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
                {isOwnProfile ? <EditProfileModal onUpdate={handleUpdate} /> : <Button type="primary" block >Subscribe</Button>}
                <Typography.Paragraph style={{ marginBottom: 0 }}>
                    {profile.bio}
                </Typography.Paragraph>
            </Flex>
        </Card>
    )
}