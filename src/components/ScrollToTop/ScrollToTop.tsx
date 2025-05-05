import { useEffect, useState } from "react";
import styles from "./ScrollToTop.module.css";

export const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
        setVisible(window.scrollY > 300);
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!visible) return null;

    return (
        <div className={styles.upButton} onClick={scrollToTop}>
            <span className={styles.upText}>Up⇡</span>
        </div>
    );
};