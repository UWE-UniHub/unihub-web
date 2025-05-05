import { FC, PropsWithChildren } from "react";
import styles from "./StickySidebar.module.css";

export const StickySidebar: FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.sticky}>{children}</div>;
};
