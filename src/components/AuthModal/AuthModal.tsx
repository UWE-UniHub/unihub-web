import {FC, useState} from "react";
import {Button, Flex, Form, Modal} from "antd";
import {LoginPost, SignupPost} from "../../types/domain.ts";
import {LoginForm} from "./components/LoginForm.tsx";
import {useLoginHandler} from "./hooks/useLoginHandler.ts";
import {SignupForm} from "./components/SignupForm.tsx";
import {useSignupHandler} from "./hooks/useSignupHandler.ts";

export type AuthModalState = 'login' | 'signup' | null;

type Props = {
    state: AuthModalState;
    onStateChange: (state: AuthModalState) => void;
}

const MODAL_TITLE_MAP: Record<Exclude<AuthModalState, null>, string> = {
    'login': 'Login',
    'signup': 'Sign up'
};

const MODAL_OK_TEXT_MAP: Record<Exclude<AuthModalState, null>, string> = {
    'login': 'Login',
    'signup': 'Sign up',
};

export const AuthModal: FC<Props> = ({ state, onStateChange }) => {
    const [loginForm] = Form.useForm<LoginPost>();
    const [signupForm] = Form.useForm<SignupPost>();

    const [loading, setLoading] = useState(false);
    const [handleLogin] = useLoginHandler({
        setLoading,
        onSuccess: () => onStateChange(null)
    });
    const [handleSignup] = useSignupHandler({
        setLoading,
        onSuccess: () => onStateChange('login')
    });

    const submitFuncMap: Record<Exclude<AuthModalState, null>, VoidFunction> = {
        'login': loginForm.submit,
        'signup': signupForm.submit,
    };

    return (
        <Modal
            title={MODAL_TITLE_MAP[state || 'login']}
            open={Boolean(state)}
            footer={(originNode) => (
                <Flex align="center" justify="space-between">
                    {state === 'login' && <Button type="link" onClick={() => onStateChange('signup')}>Sign up</Button>}
                    {state === 'signup' && <Button type="link" onClick={() => onStateChange('login')}>Already registered?</Button>}
                    <Flex align="center" gap={8}>
                        {originNode}
                    </Flex>
                </Flex>
            )}
            onOk={submitFuncMap[state || 'login']}
            okText={MODAL_OK_TEXT_MAP[state || 'login']}
            okButtonProps={{ loading }}
            onCancel={() => onStateChange(null)}
            centered
            destroyOnClose
        >
            {state === 'login' && (
                <LoginForm
                    form={loginForm}
                    onFinish={handleLogin}
                />
            )}
            {state === 'signup' && (
                <SignupForm
                    form={signupForm as any}
                    onFinish={handleSignup}
                />
            )}
        </Modal>
    )
}