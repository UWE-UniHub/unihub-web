import {FC} from "react";
import {Flex} from "antd";
import {GenericProfileCommunityProps, isGenericCommunityProps, isGenericProfileProps} from "./types.ts";
import {ProfileCommunityInfoCard} from "./components/ProfileCommunityInfoCard/ProfileCommunityInfoCard.tsx";
import {ProfileTypeCards} from "./components/ProfileTypeCards/ProfileTypeCards.tsx";

type Props = GenericProfileCommunityProps & {
    avatarVersion: number;
    onUpdate: VoidFunction;
    onEdit: VoidFunction;
    onShowSubscribers?: VoidFunction;
    onShowSubscriptions?: VoidFunction;
};

export const GenericProfileCommunityColumn: FC<Props> = (props) => (
    <Flex vertical gap={16}>
        {isGenericProfileProps(props) && (
            <ProfileCommunityInfoCard
                {...props}
                type="profile"
                profile={props.profile}
            />
        )}
        {isGenericCommunityProps(props) && (
            <ProfileCommunityInfoCard
                {...props}
                type="community"
                community={props.community}
            />
        )}
        {isGenericProfileProps(props) && <ProfileTypeCards profile={props.profile} />}
    </Flex>
)