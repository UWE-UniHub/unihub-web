import {FC} from "react";
import {Button, Flex} from "antd";
import {DownOutlined, UpOutlined} from "@ant-design/icons";

type Props = {
    label: string;
    length: number | undefined;
    more: boolean;
    setMore: (more: boolean) => void;
}

export const GroupMoreLabel: FC<Props> = ({ label, length, more, setMore }) => (
    <Flex align="center" justify="space-between">
        {label}
        {(length || 0) > 3 && (
            <Button
                size="small"
                type="link"
                icon={more ? <UpOutlined /> : <DownOutlined />}
                onClick={() => setMore(!more)}
            >
                More
            </Button>
        )}
    </Flex>
)