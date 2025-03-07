import {FC, useEffect, useState} from "react";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import styles from './AvatarUploadContent.module.css';

type Props = {
    url: string | undefined;
    loading: boolean;
}

export const AvatarUploadContent: FC<Props> = ({ url, loading }) => {
    const [error, setError] = useState(false);

    const src = `${url}?${new Date().getTime()}`;

    useEffect(() => {
        setError(false);
    }, [src]);

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
            src={src}
            alt="avatar"
            className={styles.image}
            onError={() => setError(true)}
        />
    )
}