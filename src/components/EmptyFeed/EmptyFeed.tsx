import {FC} from "react";
import {Result} from "antd";

export const EmptyFeed: FC = () => {
    return (
        <Result
            status="404"
            title="No publications here yet!"
            subTitle="TODO: Insert elevator music"
        />
    )
}