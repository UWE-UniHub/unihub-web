import {FC, useEffect, useState} from "react";
import styles from './FeedPage.module.css'
import {FeedColumn} from "./components/FeedColumn/FeedColumn.tsx";
import {WidgetColumn} from "./components/WidgetColumn/WidgetColumn.tsx";

export const FeedPage: FC = () => {
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.feedColumnContainer}>
                    <FeedColumn />
                </div>
                <WidgetColumn />
            </div>
            {showScroll && (
                <div className={styles.leftScrollZone} onClick={scrollToTop}>
                    <span className={styles.upText}>Up⇡</span>
                </div>
            )}
        </>
    )
}