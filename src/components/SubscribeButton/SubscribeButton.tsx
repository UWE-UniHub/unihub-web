import {FC, useState} from "react";
import {App, Button} from "antd";
import {profilesProfileIdFollowPost} from "../../api/profiles/profilesProfileIdFollowPost.ts";
import {profilesProfileIdFollowDelete} from "../../api/profiles/profilesProfileIdFollowDelete.ts";
import {communitiesCommunityIdFollowPost} from "../../api/communities/communitiesCommunityIdFollowPost.ts";
import {communitiesCommunityIdFollowDelete} from "../../api/communities/communitiesCommunityIdFollowDelete.ts";
import {useOwnProfile} from "../../stores/OwnProfileStore.ts";
import {useAuthModal} from "../LayoutWrapper/useAuthModal.ts";
import {useProfileSubscriptions} from "../../queries/useProfileSubscriptions.ts";
import {useProfileFollowers} from "../../queries/useProfileFollowers.ts";
import {useCommunityFollowers} from "../../queries/useCommunityFollowers.ts";

type Props = {
    type: 'profile' | 'community';
    id: string;
    subscribed: boolean;
    onUpdate: VoidFunction;
}

export const SubscribeButton: FC<Props> = ({ type, id, subscribed, onUpdate }) => {
    const { profile } = useOwnProfile();
    const { openModal } = useAuthModal();
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false);

    const { refetch: refetchProfileSubs } = useProfileSubscriptions(id, type === 'profile');
    const { refetch: refetchProfileFol } = useProfileFollowers(id, type === 'profile');
    const { refetch: refetchCommunityFol } = useCommunityFollowers(id, type === 'community');


    const handleSubscribe = () => {
        if(!profile) {
            return openModal('login');
        }

        setLoading(true);
        (type === 'profile' ? profilesProfileIdFollowPost : communitiesCommunityIdFollowPost)(id).then(() => {
            void message.success('Subscribed!');
            onUpdate();
            if(type === 'profile') {
                void refetchProfileSubs();
                void refetchProfileFol();
            } else {
                void refetchCommunityFol();
            }
        }).catch((e) => {
            console.error(e);
            void message.error(`Error (${JSON.stringify(e)})`);
        }).finally(() => setLoading(false));
    }

    const handleUnsubscribe = () => {
        setLoading(true);
        (type === 'profile' ? profilesProfileIdFollowDelete : communitiesCommunityIdFollowDelete)(id).then(() => {
            void message.success('Unsubscribed!');
            onUpdate();
        }).catch((e) => {
            console.error(e);
            void message.error(`Error (${JSON.stringify(e)})`);
        }).finally(() => setLoading(false));
    }

    if(subscribed) {
        return (
            <Button
                block
                loading={loading}
                onClick={handleUnsubscribe}
            >Unsubscribe</Button>
        )
    }

    return (
        <Button
            type="primary"
            block
            loading={loading}
            onClick={handleSubscribe}
        >Subscribe</Button>
    )
}