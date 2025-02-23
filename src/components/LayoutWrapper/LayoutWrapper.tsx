import {FC, useEffect} from "react";
import {Avatar, Button, Flex, Layout, Menu, Popover, theme, Typography} from "antd";
import styles from './LayoutWrapper.module.css';
import {LoginOutlined, LogoutOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import {Link, Outlet} from "react-router";
import {stringToColor} from "../../utils/stringToColor.ts";
import {useOwnProfile} from "../../stores/OwnProfileStore.ts";
import {authGet} from "../../api/auth/authGet.ts";

export const LayoutWrapper: FC = () => {
    const { token } = theme.useToken();
    const { profile, setProfile } = useOwnProfile();

    useEffect(() => {
        if(!profile) {
            authGet().then((payload) => {
                if(payload) {
                    setProfile(payload);
                }
            });
        }
    }, [profile]);

    return (
        <Layout>
            <Layout.Header className={styles.layoutHeader}>
                <Flex align="center" gap={16}>
                    <Flex align="center" gap={2}>
                        <TeamOutlined
                            style={{ color: token.colorTextLightSolid, fontSize: '32px', marginTop: '3px' }}
                        />
                        <Link
                            to="/"
                            style={{
                                fontWeight: '700',
                                fontSize: '30px',
                                color: token.colorTextLightSolid
                            }}
                        >UniHub</Link>
                    </Flex>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        disabledOverflow
                        items={[]}
                    />
                </Flex>
                {profile ? (
                    <Popover
                        trigger="click"
                        placement="bottom"
                        styles={{ body: { padding: 8, overflow: 'hidden' } }}
                        content={(
                            <Flex vertical gap={6}>
                                <Link to="/profile">
                                    <Button
                                        type="text"
                                        icon={<UserOutlined />}
                                    >Profile</Button>
                                </Link>
                                <Button
                                    type="primary"
                                    danger
                                    block
                                    icon={<LogoutOutlined />}
                                    onClick={() => {}}
                                >Log out</Button>
                            </Flex>
                        )}
                    >
                        <Button type="text">
                            <Flex align="center" gap={8}>
                                <Avatar style={{ backgroundColor: stringToColor(`JD`) }}>
                                    JD
                                </Avatar>
                                <Typography.Text style={{ color: token.colorTextLightSolid }}>John Doe</Typography.Text>
                            </Flex>
                        </Button>
                    </Popover>
                ) : (
                    <Button
                        type="primary"
                        size="large"
                        icon={<LoginOutlined />}
                    >
                        Login
                    </Button>
                )}
            </Layout.Header>
            <Layout.Content className={styles.content}>
                <Outlet />
            </Layout.Content>
        </Layout>
    )
}