import {FC} from "react";
import {Profile} from "../../types/domain.ts";
import {List, Modal} from "antd";
import {ProfileAvatar} from "../ProfileAvatar/ProfileAvatar.tsx";
import {Link} from "react-router";

type Props = {
    title: string;
    profiles?: Profile[];
    open: boolean;
    onClose: VoidFunction;
}

export const ProfilesListModal: FC<Props> = ({ title, profiles, open, onClose }) => (
    <Modal
        title={title}
        open={open}
        footer={null}
        onCancel={onClose}
    >
        <List
            dataSource={profiles}
            renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<ProfileAvatar profile={item} version={0} />}
                        title={<Link to={`/profile/${item.id}`}>{item.first_name} {item.last_name}</Link>}
                        description={item.bio}
                    />
                </List.Item>
            )}
        />
    </Modal>
)