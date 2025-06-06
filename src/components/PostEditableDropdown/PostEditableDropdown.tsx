import {FC, useState} from "react";
import {DeleteOutlined, EditOutlined, EllipsisOutlined} from "@ant-design/icons";
import {Button, Dropdown, MenuProps} from "antd";

type Props = {
    onEdit: VoidFunction;
    onDelete: VoidFunction;
}

export const PostEditableDropdown: FC<Props> = ({ onEdit, onDelete }) => {
    const [open, setOpen] = useState(false);

    const items: MenuProps['items'] = [
        {
            key: 'edit',
            icon: <EditOutlined />,
            label: 'Edit',
            onClick: (e) => {
                e.domEvent.stopPropagation();
                onEdit();
            }
        },
        {
            key: 'delete',
            icon: <DeleteOutlined />,
            label: 'Delete',
            danger: true,
            onClick: (e) => {
                e.domEvent.stopPropagation();
                onDelete();
            }
        }
    ]

    return (
        <Dropdown
            menu={{ items }}
            open={open}
            onOpenChange={setOpen}
        >
            <Button
                type="text"
                icon={<EllipsisOutlined rotate={90} style={{ fontSize: '16px' }} />}
                onClick={(e) => { e.stopPropagation(); setOpen(true); }}
            />
        </Dropdown>
    )
}