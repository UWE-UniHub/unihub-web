import {FC, useState} from "react";
import {App, Button} from "antd";
import {profilesProfileIdFollowPost} from "../../../../api/profiles/profilesProfileIdFollowPost.ts";
import {profilesProfileIdFollowDelete} from "../../../../api/profiles/profilesProfileIdFollowDelete.ts";

type Props = {
    profileId: string;
    subscribed: boolean;
    onUpdate: VoidFunction;
}

export const SubscribeButton: FC<Props> = ({ profileId, subscribed, onUpdate }) => {
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false);

    const handleSubscribe = () => {
        setLoading(true);
        profilesProfileIdFollowPost(profileId).then(() => {
            void message.success('Subscribed!');
            onUpdate();
        }).catch((e) => {
            console.error(e);
            void message.error(`Error (${JSON.stringify(e)})`);
        }).finally(() => setLoading(false));
    }

    const handleUnsubscribe = () => {
        setLoading(true);
        profilesProfileIdFollowDelete(profileId).then(() => {
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