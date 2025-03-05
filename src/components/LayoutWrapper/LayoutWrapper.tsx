import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {App, Button, Flex, Layout, Menu, Popover, theme, Typography} from "antd";
import styles from './LayoutWrapper.module.css';
import {LoginOutlined, LogoutOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import {Link, Outlet} from "react-router";
import {useOwnProfile} from "../../stores/OwnProfileStore.ts";
import {authGet} from "../../api/auth/authGet.ts";
import {AuthModal, AuthModalState} from "../AuthModal/AuthModal.tsx";
import {AuthModalProvider} from "./useAuthModal.ts";
import {authDelete} from "../../api/auth/authDelete.ts";
import {ProfileAvatar} from "../ProfileAvatar/ProfileAvatar.tsx";

export const LayoutWrapper: FC = () => {
    const { token } = theme.useToken();
    const { profile, setProfile } = useOwnProfile();
    const { message } = App.useApp();

    const checkAuth = useCallback(() => {
        if(!profile) {
            authGet().then((payload) => {
                if(payload) {
                    setProfile(payload);
                }
            });
        }
    }, [profile]);

    useEffect(() => {
        checkAuth();
    }, [profile]);

    const handleLogout = () => {
        authDelete().then(() => setProfile(null));
    }

    const [authModalState, setAuthModalState] = useState<AuthModalState>(null);
    const authModalContext = useMemo(() => ({
        openModal: (state: AuthModalState) => {
            if(profile) {
                void message.info('You are already logged in');
                return;
            }

            setAuthModalState(state);
        },
        checkAuth
    }), [profile, checkAuth]);

    return (
        <Layout className={styles.layout}>
            <Layout.Header>
                <Flex align="center" justify="space-between" className={styles.layoutHeader}>
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
                                    <Link to={`/profile/${profile.id}`}>
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
                                        onClick={handleLogout}
                                    >Log out</Button>
                                </Flex>
                            )}
                        >
                            <Button type="text">
                                <Flex align="center" gap={8}>
                                    <ProfileAvatar profile={profile} />
                                    <Typography.Text style={{ color: token.colorTextLightSolid }}>
                                        {profile.first_name} {profile.last_name}
                                    </Typography.Text>
                                </Flex>
                            </Button>
                        </Popover>
                    ) : (
                        <Button
                            type="primary"
                            size="large"
                            icon={<LoginOutlined />}
                            onClick={() => setAuthModalState('login')}
                        >
                            Login
                        </Button>
                    )}
                </Flex>
            </Layout.Header>
            <Layout.Content className={styles.content}>
                <AuthModalProvider value={authModalContext}>
                    <Outlet />
                    <AuthModal
                        state={authModalState}
                        onStateChange={setAuthModalState}
                    />
                </AuthModalProvider>
            </Layout.Content>
        </Layout>
    )
}