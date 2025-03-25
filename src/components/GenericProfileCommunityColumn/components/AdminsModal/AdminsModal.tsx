import {FC, useEffect, useState} from "react";
import {ArrowRightOutlined, PlusOutlined, UserSwitchOutlined} from "@ant-design/icons";
import {App, Button, Flex, List, Modal, Popover, Select, Spin} from "antd";
import {CommunityDetailed} from "../../../../types/domain.ts";
import {useCommunityAdmins} from "../../../../queries/useCommunityAdmins.ts";
import styles from './AdminsModal.module.css';
import {AdminsModalUserItem} from "../AdminsModalUserItem/AdminsModalUserItem.tsx";
import {
    communitiesCommunityIdAdminsProfileIdPost
} from "../../../../api/communities/communitiesCommunityIdAdminsProfileIdPost.ts";
import {useCommunityEligibleAdmins} from "../../../../queries/useCommunityEligibleAdmins.ts";

type Props = {
    community: CommunityDetailed;
}

export const AdminsModal: FC<Props> = ({ community }) => {
    const { message } = App.useApp();

    const [open, setOpen] = useState(false);

    const { data: admins, refetch } = useCommunityAdmins(community.id);
    const { data: eligibleAdmins, refetch: refetchEligible } = useCommunityEligibleAdmins(community.id);

    const [selectedAdmin, setSelectedAdmin] = useState('');

    useEffect(() => {
        if(eligibleAdmins) {
            setSelectedAdmin(eligibleAdmins[0]?.id || '');
        }
    }, [eligibleAdmins]);

    const [popoverOpen, setPopoverOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleAddAdmin = () => {
        if(!selectedAdmin) return;

        setLoading(true);
        communitiesCommunityIdAdminsProfileIdPost(community.id, selectedAdmin).then(() => {
            void message.success('Success');
            void refetch();
            void refetchEligible();
            setPopoverOpen(false);
        }).catch((e) => {
            void message.error(`Error (${JSON.stringify(e)})`);
            console.error(e);
        }).finally(() => setLoading(false))
    }

    const addAdminPopoverContent = (
        <Flex gap={4}>
            <Select
                options={eligibleAdmins?.map(({ id, first_name, last_name }) => ({
                    value: id,
                    label: `${first_name} ${last_name}`
                }))}
                className={styles.popoverSelect}
                value={selectedAdmin}
                onChange={setSelectedAdmin}
            />
            <Button
                type="primary"
                icon={<ArrowRightOutlined />}
                loading={loading}
                onClick={handleAddAdmin}
            />
        </Flex>
    );

    return (
        <>
            <Button
                block
                icon={<UserSwitchOutlined />}
                onClick={() => setOpen(true)}
            >Admins</Button>
            <Modal
                title={`${community.name}'s admins`}
                open={open}
                footer={null}
                onCancel={() => setOpen(false)}
                destroyOnClose
            >
                {admins ? (
                    <List
                        dataSource={[...(admins.creator ? [admins.creator] : []), ...(admins.admins || [])]}
                        renderItem={(item, i) => (
                           <AdminsModalUserItem
                               community={community}
                               item={item}
                               isItemCreator={i === 0}
                               onUpdate={() => { void refetch(); void refetchEligible(); }}
                           />
                        )}
                    />
                ) : (
                    <Spin />
                )}
                {community.is_creator && (
                    <Popover
                        trigger="click"
                        placement="top"
                        content={addAdminPopoverContent}
                        classNames={{ body: styles.popoverContent }}
                        open={popoverOpen}
                        onOpenChange={setPopoverOpen}
                    >
                        <Button
                            type="primary"
                            block
                            icon={<PlusOutlined />}
                            loading={loading}
                            disabled={!selectedAdmin?.length}
                        >Add admin</Button>
                    </Popover>
                )}
            </Modal>
        </>
    )
}