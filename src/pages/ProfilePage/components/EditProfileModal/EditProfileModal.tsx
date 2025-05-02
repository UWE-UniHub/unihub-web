import {FC, useState} from "react";
import {App, Button, DatePicker, Flex, Form, FormProps, Input, Modal, Upload, UploadProps} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {ProfilePatch} from "../../../../types/domain.ts";
import {useOwnProfile} from "../../../../stores/OwnProfileStore.ts";
import {getProfileAvatarUrl} from "../../../../utils/getProfileAvatarUrl.ts";
import styles from './EditProfileModal.module.css';
import {profilesProfileIdAvatarPut} from "../../../../api/profiles/profilesProfileIdAvatarPut.ts";
import {profilesProfileIdAvatarDelete} from "../../../../api/profiles/profilesProfileIdAvatarDelete.ts";
import {profilesProfileIdPatch} from "../../../../api/profiles/profilesProfileIdPatch.ts";
import {profilesProfileIdDelete} from "../../../../api/profiles/profilesProfileIdDelete.ts";
import {useAuthModal} from "../../../../components/LayoutWrapper/useAuthModal.ts";
import {AvatarUploadContent} from "../../../../components/AvatarUploadContent/AvatarUploadContent.tsx";
import dayjs, {Dayjs} from "dayjs";
import {InterestTagsSelect} from "../../../../components/InterestTagsSelect/InterestTagsSelect.tsx";

type Props = {
    open: boolean;
    onClose: VoidFunction;
    onUpdate: VoidFunction;
}

type FormType = Omit<ProfilePatch, 'date_of_birth'> & {
    date_of_birth: Dayjs;
}

export const EditProfileModal: FC<Props> = ({ open, onClose, onUpdate }) => {
    const { message } = App.useApp();
    const { profile } = useOwnProfile();
    const { checkAuth } = useAuthModal();
    const [form] = Form.useForm();

    const [avatarLoading, setAvatarLoading] = useState(false);
    const [avatarVersion, setAvatarVersion] = useState(0);
    const handleAvatarUpload: UploadProps['beforeUpload'] = async (file) => {
        setAvatarLoading(true);
        void profilesProfileIdAvatarPut(profile!.id, file).then(() => {
            void message.success('Success');
            checkAuth();
            onUpdate();
            setAvatarVersion((v) => v + 1);
        }).catch((e) => {
            console.error(e);
            void message.error(`Error (${JSON.stringify(e)})`);
        }).finally(() => setAvatarLoading(false));
        return false;
    }
    const handleAvatarDelete = () => {
        setAvatarLoading(true);
        profilesProfileIdAvatarDelete(profile!.id).then(() => {
            void message.success('Success');
            checkAuth();
            onUpdate();
            setAvatarVersion((v) => v + 1);
        }).catch((e) => {
            console.error(e);
            void message.error(`Error (${JSON.stringify(e)})`)
        }).finally(() => setAvatarLoading(false));
    }

    const [loading, setLoading] = useState(false);
    const handleEdit: FormProps<FormType>['onFinish'] = ({ date_of_birth, ...values }) => {
        if(!form.isFieldsTouched()) return onClose();
        setLoading(true);
        profilesProfileIdPatch(profile!.id, { ...values, date_of_birth: date_of_birth.format('YYYY-MM-DD') }).then(() => {
            void message.success('Success');
            checkAuth();
            onUpdate();
            onClose();
        }).catch((e) => {
            console.error(e);
            void message.error(`Error (${JSON.stringify(e)})`);
        }).finally(() => setLoading(false))
    }

    const handleDeleteProfile = () => {
        Modal.confirm({
            title: 'Delete your profile?',
            icon: <ExclamationCircleOutlined />,
            content: 'This action cannot be undone.',
            okText: 'Yes, delete',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                return profilesProfileIdDelete(profile!.id).then(() => {
                    void message.success('Success');
                    checkAuth();
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
            title="Edit profile"
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
                        onClick={handleDeleteProfile}
                    >
                        Delete profile
                    </Button>
                    <Flex gap={8}>
                        {buttons}
                    </Flex>
                </Flex>
            )}
        >
            <Form<FormType>
                form={form}
                layout="vertical"
                preserve={false}
                initialValues={{
                    first_name: profile?.first_name,
                    last_name: profile?.last_name,
                    bio: profile?.bio,
                    email: profile?.email,
                    address: profile?.address,
                    date_of_birth: profile?.date_of_birth ? dayjs(profile.date_of_birth) : undefined,
                    interests: profile?.interests
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
                            version={avatarVersion}
                            loading={avatarLoading}
                        />
                    </Upload>
                    <Button
                        danger
                        onClick={handleAvatarDelete}
                        loading={avatarLoading}
                    >Delete avatar</Button>
                </Flex>
                <Form.Item<FormType>
                    name="email"
                    label="Email"
                    rules={[{ type: 'email' }]}
                >
                    <Input />
                </Form.Item>
                <Flex gap={16}>
                    <Form.Item<FormType>
                        name="first_name"
                        label="First name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FormType>
                        name="last_name"
                        label="Last name"
                    >
                        <Input />
                    </Form.Item>
                </Flex>
                <Form.Item<FormType>
                    name="bio"
                    label="Bio"
                >
                    <Input.TextArea rows={3} />
                </Form.Item>
                <Form.Item<FormType>
                    name="address"
                    label="Address"
                >
                    <Input.TextArea rows={3} />
                </Form.Item>
                <Form.Item<FormType>
                    name="date_of_birth"
                    label="Date of Birth"
                    rules={[{
                        type: 'date',
                        validator: (_, value: Dayjs) => {
                            if(dayjs().year() - value.year() < 13) {
                                return Promise.reject('You must be 13 or older');
                            }
                            return Promise.resolve();
                        }
                    }]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item<FormType>
                    name="interests"
                    label="Interests"
                >
                    <InterestTagsSelect />
                </Form.Item>
            </Form>
        </Modal>
    )
}