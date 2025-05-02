import {FC, useState} from "react";
import {Button, Popover, Tooltip} from "antd";
import {TagOutlined} from "@ant-design/icons";
import {InterestTagsSelect} from "../../../InterestTagsSelect/InterestTagsSelect.tsx";

type Props = {
    value: string | undefined;
    onChange: (value: string | undefined) => void;
}

export const TagsPopover: FC<Props> = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);

    const content = (
        <InterestTagsSelect
            value={value}
            onChange={onChange}
            style={{ width: '250px' }}
        />
    )

    return (
        <Popover
            trigger="click"
            open={open}
            onOpenChange={setOpen}
            content={content}
        >
            <Tooltip title="Add tags" placement="bottom">
                <Button icon={<TagOutlined />} />
            </Tooltip>
        </Popover>
    )
}