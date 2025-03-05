import {FC} from "react";
import styles from './ProfilePage.module.css';
import {ProfileColumn} from "./components/ProfileColumn/ProfileColumn.tsx";
import {ProfileFeedColumn} from "./components/ProfileFeedColumn/ProfileFeedColumn.tsx";

export const ProfilePage: FC = () => {
    return (
        <div className={styles.container}>
            <ProfileColumn />
            <div className={styles.feedColumnContainer}>
                <ProfileFeedColumn />
            </div>
        </div>
    )
}