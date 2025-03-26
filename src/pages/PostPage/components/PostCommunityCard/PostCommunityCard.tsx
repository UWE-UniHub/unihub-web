import {FC} from "react";
import {Community} from "../../../../types/domain.ts";
import {Card, Flex, Typography} from "antd";
import styles from './PostCommunityCard.module.css';
import {CommunityAvatar} from "../../../../components/CommunityAvatar/CommunityAvatar.tsx";
import {SubscribeButton} from "../../../../components/SubscribeButton/SubscribeButton.tsx";
import {useCommunityById} from "../../../../queries/useCommunityById.ts";

type Props = {
    community: Community;
}

export const PostCommunityCard: FC<Props> = ({ community }) => {
    const { data: _community, refetch } = useCommunityById(community.id);
    const isSubscribed = Boolean(_community?.is_subscribed);

    return (
        <Card className={styles.container}>
            <Flex vertical gap={16}>
                <Flex gap={16} align="center">
                    <CommunityAvatar community={community} version={0} size={64} />
                    <Flex vertical>
                        <Typography.Title level={5}>{community.name}</Typography.Title>
                        <Typography.Paragraph className={styles.bio} ellipsis={{ rows: 2 }}>{community.bio}</Typography.Paragraph>
                    </Flex>
                </Flex>
                <SubscribeButton
                    type="community"
                    id={community.id}
                    subscribed={isSubscribed}
                    onUpdate={refetch}
                />
            </Flex>
        </Card>
    )
}