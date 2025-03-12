import {FC, useState} from "react";
import {CommunityDetailed, CommunityPatch} from "../../../../types/domain.ts";
import {App, Button, Flex, Form, FormProps, Input, Modal, Upload, UploadProps} from "antd";
import {communitiesCommunityIdAvatarPut} from "../../../../api/communities/communitiesCommunityIdAvatarPut.ts";
import {communitiesCommunityIdAvatarDelete} from "../../../../api/communities/communitiesCommunityIdAvatarDelete.ts";
import {communitiesCommunityIdPatch} from "../../../../api/communities/communitiesCommunityIdPatch.ts";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {communitiesCommunityIdDelete} from "../../../../api/communities/communitiesCommunityIdDelete.ts";
import styles from "./EditCommunityModal.module.css";
import {AvatarUploadContent} from "../../../../components/AvatarUploadContent/AvatarUploadContent.tsx";
import {getCommunityAvatarUrl} from "../../../../utils/getCommunityAvatarUrl.ts";

type Props = {
    community: CommunityDetailed;
    open: boolean;
    onClose: VoidFunction;
    onUpdate: VoidFunction;
}

export const EditCommunityModal: FC<Props> = ({ community, open, onClose, onUpdate }) => {
    const { message, modal } = App.useApp();
    const [form] = Form.useForm<CommunityPatch>();

    const [avatarLoading, setAvatarLoading] = useState(false);
    const [avatarVersion, setAvatarVersion] = useState(0);
    const handleAvatarUpload: UploadProps['beforeUpload'] = async (file) => {
        setAvatarLoading(true);
        void communitiesCommunityIdAvatarPut(community.id, file).then(() => {
            void message.success('Success');
            onUpdate();
            setAvatarVersion((v) => v + 1);
        }).catch((e) => {
            console.error(e);
            void message.error(`Error (${JSON.stringify(e)})`);
        }).finally(() => setAvatarLoading(false));
        return false;
    }
    const handleAvatarDelete = () => {
        communitiesCommunityIdAvatarDelete(community.id).then(() => {
            void message.success('Success');
            onUpdate();
            setAvatarVersion((v) => v + 1);
        }).catch((e) => {
            console.error(e);
            void message.error(`Error (${JSON.stringify(e)})`)
        })
    }

    const [loading, setLoading] = useState(false);
    const handleEdit: FormProps<CommunityPatch>['onFinish'] = (values) => {
        if(!form.isFieldsTouched()) return onClose();
        setLoading(true);
        communitiesCommunityIdPatch(community.id, values).then(() => {
            void message.success('Success');
            onUpdate();
            onClose();
        }).catch((e) => {
            console.error(e);
            void message.error(`Error (${JSON.stringify(e)})`);
        }).finally(() => setLoading(false))
    }

    const handleDeleteCommunity = () => {
        modal.confirm({
            title: 'Delete this community?',
            icon: <ExclamationCircleOutlined />,
            content: 'This action cannot be undone.',
            okText: 'Yes, delete',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                return communitiesCommunityIdDelete(community.id).then(() => {
                    void message.success('Success');
                    onUpdate();
                    onClose();
                }).catch((e) => {
                    console.error(e);
                    void message.error(`Error (${JSON.stringify(e)})`);
                });
            },
        });
    }

    return (
        <Modal
            title="Edit community"
            width={400}
            open={open}
            onOk={form.submit}
            okButtonProps={{ loading }}
            onCancel={onClose}
            destroyOnClose
            footer={(buttons) => (
                <Flex justify="space-between">
                    <Button
                        key="delete"
                        type="primary"
                        danger
                        onClick={handleDeleteCommunity}
                        disabled={!community.is_creator}
                    >
                        Delete community
                    </Button>
                    <Flex gap={8}>
                        {buttons}
                    </Flex>
                </Flex>
            )}
        >
            <Form<CommunityPatch>
                form={form}
                layout="vertical"
                preserve={false}
                initialValues={{
                    name: community.name,
                    bio: community.bio
                }}
                onFinish={handleEdit}
            >
                <Flex vertical align="center" gap={8} className={styles.uploadContainer}>
                    <Upload
                        accept="image/png"
                        className={styles.upload}
                        listType="picture-circle"
                        showUploadList={false}
                        maxCount={1}
                        beforeUpload={handleAvatarUpload}
                    >
                        <AvatarUploadContent
                            url={getCommunityAvatarUrl(community.id)}
                            version={avatarVersion}
                            loading={avatarLoading}
                        />
                    </Upload>
                    <Button
                        danger
                        onClick={handleAvatarDelete}
                    >Delete avatar</Button>
                </Flex>
                <Form.Item<CommunityPatch>
                    name="name"
                    label="Name"
                >
                    <Input />
                </Form.Item>
                <Form.Item<CommunityPatch>
                    name="bio"
                    label="Bio"
                >
                    <Input.TextArea rows={3} />
                </Form.Item>
            </Form>
        </Modal>
    )
}