import {FC} from "react";
import styles from './FeedPage.module.css'
import {useFeed} from "../../queries/useFeed.ts";
import {Spin} from "antd";
import {FeedColumn} from "./components/FeedColumn/FeedColumn.tsx";
import {WidgetColumn} from "./components/WidgetColumn/WidgetColumn.tsx";

export const FeedPage: FC = () => {
    // TODO convert to smart feed w/ intersection observer
    const { data: feed, refetch } = useFeed();

    return (
        <div className={styles.container}>
            <Spin spinning={!feed} fullscreen />
            <div className={styles.feedColumnContainer}>
                {feed && (
                    <FeedColumn posts={feed.results} onUpdate={refetch} />
                )}
            </div>
            <WidgetColumn />
        </div>
    )
}