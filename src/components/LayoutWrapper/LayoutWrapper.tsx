import {FC} from "react";
import {Avatar, Button, Flex, Layout, Menu, Popover, theme, Typography} from "antd";
import styles from './LayoutWrapper.module.css';
import {LogoutOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import {Link, Outlet} from "react-router";
import {stringToColor} from "../../utils/stringToColor.ts";

export const LayoutWrapper: FC = () => {
    const { token } = theme.useToken();

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
            </Layout.Header>
            <Layout.Content className={styles.content}>
                <Outlet />
            </Layout.Content>
        </Layout>
    )
}