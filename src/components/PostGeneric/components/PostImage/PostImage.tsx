import {FC, useState} from "react";
import {Image} from "antd";
import {getPostImageUrl} from "../../../../utils/getPostImageUrl.ts";

type Props = {
    postId: string;
}

export const PostImage: FC<Props> = ({ postId }) => {
    const [hideImage, setHideImage] = useState(false);

    if(hideImage) {
        return null;
    }

    return (
        <Image
            src={getPostImageUrl(postId)}
            onError={() => setHideImage(true)}
        />
    )
}