import {FC} from "react";
import {App, Button, List} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {ProfileAvatar} from "../../../ProfileAvatar/ProfileAvatar.tsx";
import {CommunityDetailed, Profile} from "../../../../types/domain.ts";
import {
    communitiesCommunityIdAdminsProfileIdDelete
} from "../../../../api/communities/communitiesCommunityIdAdminsProfileIdDelete.ts";

type Props = {
    community: CommunityDetailed;
    item: Profile;
    isItemCreator: boolean;
    onUpdate: VoidFunction;
}

export const AdminsModalUserItem: FC<Props> = ({ community, item, isItemCreator, onUpdate }) => {
    const { message } = App.useApp();

    const handleDeleteAdmin = () => {
        communitiesCommunityIdAdminsProfileIdDelete(community.id, item.id).then(() => {
            void message.success('Success');
            onUpdate();
        }).catch((e) => {
            void message.error(`Error (${JSON.stringify(e)})`);
            console.error(e);
        })
    }

    return (
        <List.Item
            actions={community.is_creator && !isItemCreator ? (
                [
                    <Button
                        key="edit"
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        title="Delete"
                        onClick={handleDeleteAdmin}
                    />
                ]
            ) : undefined}
        >
            <List.Item.Meta
                avatar={<ProfileAvatar profile={item} version={0} />}
                title={`${item.first_name} ${item.last_name}`}
                description={isItemCreator ? 'Creator' : 'Admin'}
            />
        </List.Item>
    )
}