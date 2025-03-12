import {FC, PropsWithChildren} from "react";
import {EditOutlined} from "@ant-design/icons";
import {Button} from "antd";

type Props = {
    type: 'profile' | 'community';
    isOwnProfile: boolean;
    isAdmin: boolean;
    onEdit: VoidFunction;
}

export const ActionButtonWrapper: FC<Props & PropsWithChildren> = (props) => {
    if(props.type === 'profile' && props.isOwnProfile) {
        return (
            <Button
                type="primary"
                icon={<EditOutlined />}
                block
                onClick={props.onEdit}
            >Edit profile</Button>
        );
    }

    if(props.type === 'community' && props.isAdmin) {
        return (
            <Button
                type="primary"
                icon={<EditOutlined />}
                block
                onClick={props.onEdit}
            >Edit community</Button>
        );
    }

    return props.children;
}