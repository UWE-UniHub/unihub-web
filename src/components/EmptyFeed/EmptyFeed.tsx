import {FC} from "react";
import {Empty, Result} from "antd";

type Props = {
    comments?: boolean;
}

export const EmptyFeed: FC<Props> = ({ comments }) => {
    if(comments) {
        return (
            <Empty
                description="No comments here yet!"
            />
        )
    }

    return (
        <Result
            status="404"
            title="No publications here yet!"
            subTitle="TODO: Insert elevator music"
        />
    )
}