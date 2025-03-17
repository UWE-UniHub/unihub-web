import {FC} from "react";
import {useCommunities} from "../../queries/useCommunities.ts";
import {Flex, Spin, Typography} from "antd";
import {CommunitiesGallery} from "./components/CommunitiesGallery/CommunitiesGallery.tsx";
import {AddCommunityModal} from "./components/AddCommunityModal/AddCommunityModal.tsx";

export const CommunitiesPage: FC = () => {
    const { data: communities, refetch } = useCommunities();

    return (
        <Flex vertical gap={16} flex="1 0">
            <Flex align="center" justify="space-between">
                <Typography.Title level={3}>Communities</Typography.Title>
                <AddCommunityModal onCreate={refetch} />
            </Flex>
            {communities ? (
                <CommunitiesGallery communities={communities} />
            ) : (
                <Flex align="center" justify="center" flex="1 0">
                    <Spin />
                </Flex>
            )}
        </Flex>
    );
}