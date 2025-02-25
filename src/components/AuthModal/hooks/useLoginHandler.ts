import {App, FormProps} from "antd";
import {LoginPost} from "../../../types/domain.ts";
import {authLoginPost} from "../../../api/auth/authLoginPost.ts";
import {useAuthModal} from "../../LayoutWrapper/useAuthModal.ts";

type Params = {
    setLoading: (loading: boolean) => void;
    onSuccess: VoidFunction;
}

export const useLoginHandler = ({ setLoading, onSuccess }: Params): [FormProps<LoginPost>['onFinish']] => {
    const { message } = App.useApp();
    const { checkAuth } = useAuthModal();

    return [
        (values) => {
            setLoading(true);
            authLoginPost(values).then(() => {
                void message.success('Success!');
                void checkAuth();
                onSuccess();
            }).catch((err) => {
                void message.error('Incorrect credentials, try again');
                console.error(err);
            }).finally(() => {
                setLoading(false);
            })
        }
    ]
}