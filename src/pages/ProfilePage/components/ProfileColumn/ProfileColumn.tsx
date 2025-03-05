import {FC} from "react";
import {Flex} from "antd";
import {ProfileInfoCard} from "../ProfileInfoCard/ProfileInfoCard.tsx";
import {ProfileTypeCards} from "../ProfileTypeCards/ProfileTypeCards.tsx";
import {useParams} from "react-router";
import {useProfileById} from "../../../../queries/useProfileById.ts";

export const ProfileColumn: FC = () => {
    const { profileId } = useParams();
    const { data: profile } = useProfileById(profileId!);

    return (
        <Flex vertical gap={16}>
            {profile && <ProfileInfoCard profile={profile} />}
            {profile && <ProfileTypeCards profile={profile} />}
        </Flex>
    );
}