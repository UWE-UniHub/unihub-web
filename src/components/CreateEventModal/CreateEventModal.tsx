import {PlusOutlined, PushpinOutlined} from "@ant-design/icons";
import {App, Button, DatePicker, Form, FormProps, Input, Modal} from "antd";
import {FC, useState} from "react";
import {EventPost} from "../../types/domain.ts";
import dayjs from "dayjs";
import {profilesProfileIdEventsPost} from "../../api/profiles/profilesProfileIdEventsPost.ts";
import {communitiesCommunityIdEventsPost} from "../../api/communities/communitiesCommunityIdEventsPost.ts";

type Props = {
    type: 'profile' | 'community';
    id: string;
    onCreate: VoidFunction;
}

export const CreateEventModal: FC<Props> = ({ type, id, onCreate }) => {
    const { message } = App.useApp();
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm<EventPost>();

    const [loading, setLoading] = useState(false);
    const handleCreate: FormProps<EventPost>['onFinish'] = (values) => {
        setLoading(true);
        (type === 'profile' ?
            profilesProfileIdEventsPost :
            communitiesCommunityIdEventsPost
        )(id, values).then(() => {
            void message.success('Event created');
            onCreate();
            setOpen(false);
        }).catch((e) => {
            console.error(e);
            void message.error(JSON.stringify(e));
        }).finally(() => setLoading(false));
    }

    return (
        <>
            <Button
                type="primary"
                size="small"
                icon={<PlusOutlined />}
            >Add event</Button>
            <Modal
                title="Create event"
                open={open}
                onOk={form.submit}
                okButtonProps={{ loading }}
                onCancel={() => setOpen(false)}
                destroyOnClose
            >
                <Form<EventPost>
                    form={form}
                    layout="vertical"
                    preserve={false}
                    onFinish={handleCreate}
                >
                    <Form.Item<EventPost>
                        name="description"
                        label="Description"
                        rules={[{ type: 'string', required: true }]}
                    >
                        <Input.TextArea
                            rows={3}
                        />
                    </Form.Item>
                    <Form.Item<EventPost>
                        name="location"
                        label="Location"
                        rules={[{ type: 'string', required: true }]}
                    >
                        <Input prefix={<PushpinOutlined />} />
                    </Form.Item>
                    <Form.Item<EventPost>
                        name="date"
                        label="Date"
                        rules={[{ type: 'date', required: true }]}
                    >
                        <DatePicker disabledDate={(date) => date && date.isBefore(dayjs())} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}