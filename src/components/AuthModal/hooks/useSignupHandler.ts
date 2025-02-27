import {App, FormProps} from "antd";
import {SignupPost} from "../../../types/domain.ts";
import {authSignupPost} from "../../../api/auth/authSignupPost.ts";

type Params = {
    setLoading: (loading: boolean) => void;
    onSuccess: VoidFunction;
}

export const useSignupHandler = ({ setLoading, onSuccess }: Params): [FormProps<SignupPost>['onFinish']] => {
    const { message } = App.useApp();

    return [
        (values) => {
            setLoading(true);
            authSignupPost(values).then(() => {
                void message.success('Success, you can now login!');
                onSuccess();
            }).catch((err) => {
                void message.error('Something went wrong, please try again');
                console.error(err);
            }).finally(() => {
                setLoading(false);
            })
        }
    ]
}