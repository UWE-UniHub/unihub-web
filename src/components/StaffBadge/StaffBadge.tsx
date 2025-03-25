import {FC} from "react";
import {StarFilled} from "@ant-design/icons";
import styles from './StaffBadge.module.css';
import {Tooltip} from "antd";

export const StaffBadge: FC = () => (
    <Tooltip title="University Staff">
        <div className={styles.container}>
            <StarFilled className={styles.icon}/>
        </div>
    </Tooltip>
)