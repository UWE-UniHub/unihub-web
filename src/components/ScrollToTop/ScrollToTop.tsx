import { useEffect, useState } from "react";
import styles from "./ScrollToTop.module.css";
import {Typography} from "antd";
import {UpOutlined} from "@ant-design/icons";

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
            <Typography.Text type="secondary" className={styles.upText} strong>
                <UpOutlined /> Scroll to Top
            </Typography.Text>
        </div>
    );
};