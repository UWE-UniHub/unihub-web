import {FC} from "react";
import {Flex, Form, FormInstance, FormProps, Input, InputNumber} from "antd";
import {SignupPost} from "../../../types/domain.ts";
import {COMMON_FORM_PROPS} from "../constants.ts";
import {ProfileTypeSegmented} from "./ProfileTypeSegmented.tsx";

export type SignupFormType = SignupPost & {
    repeat_password: string;
}

type Props = {
    form: FormInstance<SignupFormType>;
    onFinish: FormProps<SignupFormType>['onFinish'];
}

export const SignupForm: FC<Props> = ({ form, onFinish }) => {
    const isStaff = Form.useWatch('is_staff', form);

    return (
        <Form<SignupFormType>
            {...COMMON_FORM_PROPS}
            form={form}
            onFinish={onFinish}
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 17 }}
            initialValues={{
                is_staff: false,
                staff: null,
                student: null
            }}
        >
            <Form.Item<SignupFormType>
                name="id"
                label="Student ID"
                rules={[{
                    required: true,
                    type: 'number'
                }]}
            >
                <InputNumber style={{ width: '100%' }} controls={false} />
            </Form.Item>
            <Form.Item<SignupFormType> label='Name'>
                <Flex gap={16}>
                    <Form.Item<SignupFormType>
                        noStyle
                        name="first_name"
                        rules={[{ required: true, whitespace: true, type: 'string' }]}
                        style={{ flex: '1 0' }}
                    >
                        <Input placeholder="John" />
                    </Form.Item>
                    <Form.Item<SignupFormType>
                        noStyle
                        name="last_name"
                        rules={[{ required: true, whitespace: true, type: 'string' }]}
                        style={{ flex: '1 0' }}
                    >
                        <Input placeholder="Doe" />
                    </Form.Item>
                </Flex>
            </Form.Item>
            <Form.Item<SignupFormType>
                name="is_staff"
                label=" "
                colon={false}
            >
                <ProfileTypeSegmented />
            </Form.Item>
            {isStaff ? (
                <>
                    <Form.Item<SignupFormType>
                        name={['staff', 'position']}
                        label="Position"
                        rules={[{ type: "string", required: true, whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<SignupFormType>
                        name={['staff', 'department']}
                        label="Department"
                        rules={[{ type: "string", required: true, whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                </>
            ) : (
                <>
                    <Form.Item<SignupFormType>
                        name={['student', 'program']}
                        label="Program"
                        rules={[{ type: "string", required: true, whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<SignupFormType>
                        name={['student', 'level']}
                        label="Level"
                        rules={[{ type: "string", required: true, whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<SignupFormType>
                        name={['student', 'school']}
                        label="School"
                        rules={[{ type: "string", required: true, whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                </>
            )}
            <Form.Item<SignupFormType>
                name="password"
                label="Password"
                hasFeedback
                rules={[
                    { required: true, type: "string" },
                    {
                        type: 'string',
                        min: 8,
                        message: 'Password should be at least 8 characters'
                    },
                    {
                        pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!#$%\-_=+<>])([a-zA-Z0-9!#$%\-_=+<>]+)$/,
                        message: `Password should contain at least one digit, one letter and one special character`
                    }
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item<SignupFormType>
                name="repeat_password"
                label="Confirm password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    { required: true, whitespace: true, type: 'string' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Passwords should match'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>
        </Form>
    )
}