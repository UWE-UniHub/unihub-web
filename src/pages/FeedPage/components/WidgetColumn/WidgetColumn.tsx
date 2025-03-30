import {FC} from "react";
import {useOwnProfile} from "../../../../stores/OwnProfileStore.ts";
import {Button, Card, Flex, Typography} from "antd";
import {ProfileAvatar} from "../../../../components/ProfileAvatar/ProfileAvatar.tsx";
import styles from './WidgetColumn.module.css'
import {useNavigate} from "react-router";
import {useAuthModal} from "../../../../components/LayoutWrapper/useAuthModal.ts";

export const WidgetColumn: FC = () => {
    const { profile } = useOwnProfile();
    const navigate = useNavigate();
    const { openModal } = useAuthModal();

    if(profile) {
        return (
            <Card className={styles.container}>
                <Flex align="center" vertical gap={16}>
                    <ProfileAvatar profile={profile} version={0} size={64} />
                    <Typography.Title level={3}>{profile.first_name} {profile.last_name}</Typography.Title>
                    <Button
                        type="primary"
                        size="large"
                        block
                        onClick={() => navigate(`/profile/${profile?.id}`)}
                    >Create a post</Button>
                </Flex>
            </Card>
        )
    }

    return (
        <Card className={styles.container}>
            <Flex align="center" vertical gap={16}>
                <Typography.Title level={3}>New to UniHub?</Typography.Title>
                <Button
                    type="primary"
                    size="large"
                    block
                    onClick={() => openModal('signup')}
                >Create an account now!</Button>
            </Flex>
        </Card>
    )
}