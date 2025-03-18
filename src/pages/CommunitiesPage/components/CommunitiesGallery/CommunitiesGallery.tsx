import {FC} from "react";
import {Community} from "../../../../types/domain.ts";
import styles from './CommunitiesGallery.module.css';
import {Card, Flex, Typography} from "antd";
import {CommunityAvatar} from "../../../../components/CommunityAvatar/CommunityAvatar.tsx";
import {Link} from "react-router";
import {UserOutlined} from "@ant-design/icons";

type Props = {
    communities: Community[];
}

export const CommunitiesGallery: FC<Props> = ({ communities }) => (
    <div className={styles.container}>
        {communities.map((community) => (
            <Link to={`/community/${community.id}`} style={{ minWidth: 0 }}>
                <Card key={community.id} hoverable>
                    <Flex align="center" gap={8}>
                        <CommunityAvatar community={community} version={0} className={styles.avatar} />
                        <Flex vertical gap={8} style={{ flex: '1 0', minWidth: 0}}>
                            <Flex align="center" gap={8}>
                                <Typography.Title level={5}>{community.name}</Typography.Title>
                                <Flex align="center" gap={4}>
                                    <UserOutlined />
                                    <Typography.Text>{community.subscribers}</Typography.Text>
                                </Flex>
                            </Flex>
                            <div style={{ width: "100%" }}>
                                <Typography.Text ellipsis>
                                    {community.bio}
                                </Typography.Text>
                            </div>
                        </Flex>
                    </Flex>
                </Card>
            </Link>
        ))}
    </div>
)