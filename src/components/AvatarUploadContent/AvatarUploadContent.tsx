import {FC, useState} from "react";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import styles from './AvatarUploadContent.module.css';

type Props = {
    url: string | undefined;
    loading: boolean;
}

export const AvatarUploadContent: FC<Props> = ({ url, loading }) => {
    const [error, setError] = useState(false);

    if(!url || error) {
        return (
            <button className={styles.container} type="button">
                {loading ? <LoadingOutlined/> : <PlusOutlined/>}
                <div className={styles.text}>Upload</div>
            </button>
        )
    }

    return (
        <img
            src={url}
            alt="avatar"
            className={styles.image}
            onError={() => setError(true)}
        />
    )
}