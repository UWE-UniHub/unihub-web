import {FC} from "react";
import styles from './FeedPage.module.css'
import {FeedColumn} from "./components/FeedColumn/FeedColumn.tsx";
import {WidgetColumn} from "./components/WidgetColumn/WidgetColumn.tsx";

export const FeedPage: FC = () => (
    <div className={styles.container}>
        <div className={styles.feedColumnContainer}>
            <FeedColumn />
        </div>
        <WidgetColumn />
    </div>
)