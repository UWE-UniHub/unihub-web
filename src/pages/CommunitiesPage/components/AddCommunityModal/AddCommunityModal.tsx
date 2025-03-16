import {FC, useState} from "react";
import {App, Button, Form, FormProps, Input, Modal} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useOwnProfile} from "../../../../stores/OwnProfileStore.ts";
import {CommunityPost} from "../../../../types/domain.ts";
import {generateCommunityId} from "../../../../utils/generateCommunityId.ts";
import {communitiesPost} from "../../../../api/communities/communitiesPost.ts";
import {useNavigate} from "react-router";

type Props = {
    onCreate: VoidFunction;
}

export const AddCommunityModal: FC<Props> = ({ onCreate }) => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const { profile } = useOwnProfile();
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm<CommunityPost>();

    const randomId = generateCommunityId();
    const handleRandomIdClick = () => {
        form.setFieldValue('id', randomId);
    }

    const [loading, setLoading] = useState(false);
    const handleFinish: FormProps<CommunityPost>['onFinish'] = (values) => {
        setLoading(true);
        return communitiesPost({
            ...values,
            bio: values.bio || null
        }).then((r) => {
            void message.success('Success!');
            setOpen(false);
            onCreate();
            navigate(`/community/${r.id}`);
        }).catch((e) => {
            console.error(e);
            void message.error(`Error! (${JSON.stringify(e)})`);
        }).finally(() => setLoading(false));
    }

    return (
        <>
            {profile && (
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setOpen(true)}
                >Create community</Button>
            )}
            <Modal
                title="Create community"
                open={open}
                onOk={form.submit}
                onCancel={() => setOpen(false)}
                okText="Create"
                okButtonProps={{ loading }}
                destroyOnClose
            >
                <Form<CommunityPost>
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    preserve={false}
                >
                    <Form.Item<CommunityPost>
                        label="Short link"
                        name="id"
                        rules={[{ type: 'string', required: true }]}
                        extra={(
                            <>
                                Great community names are short and memorable.<br />Need inspiration?
                                How about <Button type="text" size="small" onClick={handleRandomIdClick}>{randomId}</Button>?
                            </>
                        )}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<CommunityPost>
                        label="Community name"
                        name="name"
                        rules={[{ type: 'string', required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Bio"
                        name="bio"
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}