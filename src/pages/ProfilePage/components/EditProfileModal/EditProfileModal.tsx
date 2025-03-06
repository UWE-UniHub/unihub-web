import {FC, useState} from "react";
import {App, Button, Flex, Form, FormProps, Input, Modal, Upload, UploadProps} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {ProfilePatch} from "../../../../types/domain.ts";
import {useOwnProfile} from "../../../../stores/OwnProfileStore.ts";
import {AvatarUploadContent} from "../../../../components/AvatarUploadContent/AvatarUploadContent.tsx";
import {getProfileAvatarUrl} from "../../../../utils/getProfileAvatarUrl.ts";
import styles from './EditProfileModal.module.css';
import {profilesProfileIdAvatarPut} from "../../../../api/profiles/profilesProfileIdAvatarPut.ts";
import {useAuthModal} from "../../../../components/LayoutWrapper/useAuthModal.ts";
import {profilesProfileIdAvatarDelete} from "../../../../api/profiles/profilesProfileIdAvatarDelete.ts";
import {profilesProfileIdPatch} from "../../../../api/profiles/profilesProfileIdPatch.ts";

type Props = {
    onUpdate: VoidFunction;
}

export const EditProfileModal: FC<Props> = ({ onUpdate }) => {
    const { message } = App.useApp();
    const { profile } = useOwnProfile();
    const { checkAuth } = useAuthModal();
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const [avatarLoading, setAvatarLoading] = useState(false);
    const handleAvatarUpload: UploadProps['beforeUpload'] = async (file) => {
        setAvatarLoading(true);
        void profilesProfileIdAvatarPut(profile!.id, file).then(() => {
            void message.success('Success');
            checkAuth();
            onUpdate();
        }).catch((e) => {
            console.error(e);
            void message.error(`Error (${JSON.stringify(e)})`);
        }).finally(() => setAvatarLoading(false));

        return false;
    }
    const handleAvatarDelete = () => {
        profilesProfileIdAvatarDelete(profile!.id).then(() => {
            void message.success('Success');
            checkAuth();
            onUpdate();
        }).catch((e) => {
            console.error(e);
            void message.error(`Error (${JSON.stringify(e)})`)
        })
    }

    const [loading, setLoading] = useState(false);
    const handleEdit: FormProps<ProfilePatch>['onFinish'] = (values) => {
        if(!form.isFieldsTouched()) return setOpen(false);
        setLoading(true);
        profilesProfileIdPatch(profile!.id, values).then(() => {
            void message.success('Success');
            checkAuth();
            onUpdate();
            setOpen(false);
        }).catch((e) => {
            console.error(e);
            void message.error(`Error (${JSON.stringify(e)})`);
        }).finally(() => setLoading(false))
    }

    return (
        <>
            <Button
                type="primary"
                icon={<EditOutlined />}
                block
                onClick={() => setOpen(true)}
            >Edit profile</Button>
            <Modal
                title="Edit profile"
                width={400}
                open={open}
                onOk={form.submit}
                okButtonProps={{ loading }}
                onCancel={() => setOpen(false)}
                destroyOnClose
            >
                <Form<ProfilePatch>
                    form={form}
                    layout="vertical"
                    preserve={false}
                    initialValues={{
                        first_name: profile?.first_name,
                        last_name: profile?.last_name,
                        bio: profile?.bio
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
                                url={profile?.id ? getProfileAvatarUrl(profile.id) : undefined}
                                loading={avatarLoading}
                            />
                        </Upload>
                        <Button
                            danger
                            onClick={handleAvatarDelete}
                        >Delete avatar</Button>
                    </Flex>
                    <Flex gap={16}>
                        <Form.Item<ProfilePatch>
                            name="first_name"
                            label="First name"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<ProfilePatch>
                            name="last_name"
                            label="Last name"
                        >
                            <Input />
                        </Form.Item>
                    </Flex>
                    <Form.Item<ProfilePatch>
                        name="bio"
                        label="Bio"
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}