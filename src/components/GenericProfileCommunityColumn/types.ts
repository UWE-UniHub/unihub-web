import {CommunityDetailed, ProfileById} from "../../types/domain.ts";

type GenericProfileProps = {
    type: 'profile';
    profile: ProfileById;
}

type GenericCommunityProps = {
    type: 'community';
    community: CommunityDetailed;
}

export type GenericProfileCommunityProps = (GenericProfileProps | GenericCommunityProps);

export const isGenericProfileProps = (props: GenericProfileCommunityProps): props is GenericProfileProps =>
    props.type === 'profile';
export const isGenericCommunityProps = (props: GenericProfileCommunityProps): props is GenericCommunityProps =>
    props.type === 'community';