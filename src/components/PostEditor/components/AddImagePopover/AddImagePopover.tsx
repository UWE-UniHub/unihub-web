import {FC, useState} from "react";
import {Button, Flex, Popover, Tooltip, Typography, Upload, UploadProps} from "antd";
import {InboxOutlined, PictureOutlined} from "@ant-design/icons";
import {RcFile} from "antd/es/upload";

type Props = {
    image: RcFile | undefined;
    setImage: (image: RcFile | undefined) => void;
}

export const AddImagePopover: FC<Props> = ({ image, setImage }) => {
    const [open, setOpen] = useState(false);

    const handleAvatarUpload: UploadProps['beforeUpload'] = (file) => {
        setImage(file);
        setOpen(false);
        return false;
    }

    if(image) {
        return (
            <Button
                danger
                icon={<PictureOutlined />}
                onClick={() => setImage(undefined)}
            >Remove</Button>
        )
    }

    const content = (
        <Upload.Dragger
            accept="image/png"
            showUploadList={false}
            maxCount={1}
            beforeUpload={handleAvatarUpload}
        >
            <Flex vertical align="center" justify="center" gap={8}>
                <InboxOutlined />
                <Typography.Title level={5}>Click or drag image to this area to upload</Typography.Title>
            </Flex>
        </Upload.Dragger>
    )

    return (
        <Popover
            trigger="click"
            open={open}
            onOpenChange={setOpen}
            content={content}
        >
            <Tooltip title="Add image" placement="bottom">
                <Button icon={<PictureOutlined />} />
            </Tooltip>
        </Popover>
    )
}