import {FC, useEffect, useState} from "react";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import styles from './AvatarUploadContent.module.css';

type Props = {
    url: string | undefined;
    version: number;
    loading: boolean;
}

export const AvatarUploadContent: FC<Props> = ({ url, version, loading }) => {
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
    }, [version]);

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
            src={`${url}?${version}`}
            alt="avatar"
            className={styles.image}
            onError={() => setError(true)}
        />
    )
}