import {FC} from "react";
import {Form, FormInstance, FormProps, Input, InputNumber} from "antd";
import {LoginPost} from "../../../types/domain.ts";
import {COMMON_FORM_PROPS} from "../constants.ts";

type Props = {
    form: FormInstance<LoginPost>;
    onFinish: FormProps<LoginPost>['onFinish'];
}

export const LoginForm: FC<Props> = ({ form, onFinish }) => (
    <Form<LoginPost>
        {...COMMON_FORM_PROPS}
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
    >
        <Form.Item<LoginPost>
            name="id"
            label="Student ID"
            rules={[{
                required: true,
                type: 'number'
            }]}
        >
            <InputNumber style={{ width: '100%' }} controls={false} />
        </Form.Item>
        <Form.Item<LoginPost>
            name="password"
            label="Password"
            rules={[{
                required: true,
            }]}
        >
            <Input.Password />
        </Form.Item>
    </Form>
)