import {FC} from "react";
import {GenericProfileCommunityProps, isGenericCommunityProps, isGenericProfileProps} from "../../types.ts";
import {useOwnProfile} from "../../../../stores/OwnProfileStore.ts";
import {Card, Flex, Typography} from "antd";
import cx from 'classnames';
import {ProfileAvatar} from "../../../ProfileAvatar/ProfileAvatar.tsx";
import {SubscribeButton} from "../SubscribeButton/SubscribeButton.tsx";
import {CommunityAvatar} from "../../../CommunityAvatar/CommunityAvatar.tsx";
import {ActionButtonWrapper} from "../ActionButtonWrapper/ActionButtonWrapper.tsx";
import styles from './ProfileCommunityInfoCard.module.css';
import {AdminsModal} from "../AdminsModal/AdminsModal.tsx";

type Props = GenericProfileCommunityProps & {
    avatarVersion: number;
    onUpdate: VoidFunction;
    onEdit: VoidFunction;
    onShowSubscribers?: VoidFunction;
    onShowSubscriptions?: VoidFunction;
};

export const ProfileCommunityInfoCard: FC<Props> = (props) => {
    const { profile: ownProfile } = useOwnProfile();
    const isOwnProfile = isGenericProfileProps(props) && props.profile.id === ownProfile?.id;

    const subscribersOpenable = (isGenericProfileProps(props) ? props.profile.subscribers : props.community.subscribers) > 0;
    const subscriptionsOpenable = isGenericProfileProps(props) && props.profile.subscriptions > 0;

    const subscribersOpenableClassname = cx({[styles.subRow]: subscribersOpenable});
    const subscriptionsOpenableClassname = cx({[styles.subRow]: subscriptionsOpenable});

    return (
        <Card>
            <Flex vertical align="center" gap={16}>
                <Flex vertical align="center" gap={8}>
                    {isGenericProfileProps(props) ? (
                        <ProfileAvatar
                            profile={props.profile}
                            version={props.avatarVersion}
                            size={128}
                        />
                    ) : (
                        <CommunityAvatar
                            community={props.community}
                            version={props.avatarVersion}
                            size={128}
                        />
                    )}
                    <Typography.Title level={3}>
                        {isGenericProfileProps(props) ? `${props.profile.first_name} ${props.profile.last_name}` : props.community.name}
                    </Typography.Title>
                    <Flex gap={16}>
                        <Flex
                            gap={4}
                            align="baseline"
                            onClick={subscribersOpenable ? props.onShowSubscribers : undefined}
                            className={subscribersOpenableClassname}
                        >
                            <Typography.Title level={5}>{isGenericProfileProps(props) ? props.profile.subscribers : props.community.subscribers}</Typography.Title>
                            <Typography.Text type="secondary">subscribers</Typography.Text>
                        </Flex>
                        {isGenericProfileProps(props) && (
                            <Flex
                                gap={4}
                                align="baseline"
                                onClick={subscriptionsOpenable ? props.onShowSubscriptions : undefined}
                                className={subscriptionsOpenableClassname}
                            >
                                <Typography.Title level={5}>{props.profile.subscriptions}</Typography.Title>
                                <Typography.Text type="secondary">subscriptions</Typography.Text>
                            </Flex>
                        )}
                    </Flex>
                </Flex>
                <ActionButtonWrapper
                    type={props.type}
                    isOwnProfile={isOwnProfile}
                    isAdmin={isGenericCommunityProps(props) ? props.community.is_admin : false}
                    onEdit={props.onEdit}
                >
                    <SubscribeButton
                        type={props.type}
                        id={isGenericProfileProps(props) ? props.profile.id : props.community.id}
                        subscribed={isGenericProfileProps(props) ? props.profile.is_subscribed : props.community.is_subscribed}
                        onUpdate={props.onUpdate}
                    />
                </ActionButtonWrapper>
                {isGenericCommunityProps(props) && <AdminsModal community={props.community} />}
                <Typography.Paragraph style={{ marginBottom: 0 }}>
                    {isGenericProfileProps(props) ? props.profile.bio : props.community.bio}
                </Typography.Paragraph>
            </Flex>
        </Card>
    )
}