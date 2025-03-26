import {FC} from "react";
import {Profile} from "../../../../types/domain.ts";
import {Card, Flex, Typography} from "antd";
import {ProfileAvatar} from "../../../../components/ProfileAvatar/ProfileAvatar.tsx";
import styles from './PostProfileCard.module.css';
import {useOwnProfile} from "../../../../stores/OwnProfileStore.ts";
import {SubscribeButton} from "../../../../components/SubscribeButton/SubscribeButton.tsx";
import {useProfileById} from "../../../../queries/useProfileById.ts";

type Props = {
    profile: Profile;
}

export const PostProfileCard: FC<Props> = ({ profile }) => {
    const { profile: ownProfile } = useOwnProfile();
    const { data: _profile, refetch } = useProfileById(profile.id);
    const isSubscribed = Boolean(_profile?.is_subscribed);

    return (
        <Card className={styles.container}>
            <Flex vertical gap={16}>
                <Flex gap={16} align="center">
                    <ProfileAvatar profile={profile} version={0} size={64} />
                    <Flex vertical>
                        <Typography.Title level={5}>{profile.first_name} {profile.last_name}</Typography.Title>
                        <Typography.Paragraph className={styles.bio} ellipsis={{ rows: 2 }}>{profile.bio}</Typography.Paragraph>
                    </Flex>
                </Flex>
                {profile.id === ownProfile?.id && (
                    <SubscribeButton
                        type="profile"
                        id={profile.id}
                        subscribed={isSubscribed}
                        onUpdate={refetch}
                    />
                )}
            </Flex>
        </Card>
    )
}