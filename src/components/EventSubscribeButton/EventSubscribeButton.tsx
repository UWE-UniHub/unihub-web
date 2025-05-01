import {FC, useState} from "react";
import {useOwnProfile} from "../../stores/OwnProfileStore.ts";
import {useAuthModal} from "../LayoutWrapper/useAuthModal.ts";
import {App, Button} from "antd";
import {eventsEventIdSubscribePost} from "../../api/events/eventsEventIdSubscribePost.ts";
import {eventsEventIdSubscribeDelete} from "../../api/events/eventsEventIdSubscribeDelete.ts";
import {BellOutlined} from "@ant-design/icons";

type Props = {
    id: string;
    subscribed: boolean;
    onUpdate: VoidFunction;
}

export const EventSubscribeButton: FC<Props> = ({ id, subscribed, onUpdate }) => {
    const { profile } = useOwnProfile();
    const { openModal } = useAuthModal();
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false);

    const handleSubscribe = () => {
        if(!profile) {
            return openModal('login');
        }

        setLoading(true);
        eventsEventIdSubscribePost(id).then(() => {
            void message.success('Subscribed!');
            onUpdate();
        }).catch((e) => {
            console.error(e);
            void message.error(`Error (${JSON.stringify(e)})`);
        }).finally(() => setLoading(false));
    }

    const handleUnsubscribe = () => {
        setLoading(true);
        eventsEventIdSubscribeDelete(id).then(() => {
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
                icon={<BellOutlined />}
                loading={loading}
                onClick={handleUnsubscribe}
            >Not interested</Button>
        )
    }

    return (
        <Button
            icon={<BellOutlined />}
            type="primary"
            loading={loading}
            onClick={handleSubscribe}
        >Interested</Button>
    )
}