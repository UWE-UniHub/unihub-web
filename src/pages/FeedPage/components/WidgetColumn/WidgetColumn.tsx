import {FC} from "react";
import {useOwnProfile} from "../../../../stores/OwnProfileStore.ts";
import {Button, Card, Flex, Typography} from "antd";
import {ProfileAvatar} from "../../../../components/ProfileAvatar/ProfileAvatar.tsx";
import styles from './WidgetColumn.module.css'

export const WidgetColumn: FC = () => {
    const { profile } = useOwnProfile();

    if(profile) {
        return (
            <Card className={styles.container}>
                <Flex align="center" vertical gap={16}>
                    <ProfileAvatar profile={profile} version={0} size={64} />
                    <Typography.Title level={3}>{profile.first_name} {profile.last_name}</Typography.Title>
                    <Button type="primary" size="large" block>Create a post</Button>
                </Flex>
            </Card>
        )
    }
}