import {FC} from "react";
import {PostCommunity, PostProfile} from "../../types/domain.ts";
import {Card, Divider, Flex, Typography} from "antd";
import {isCommunityPost, isProfilePost} from "./utils/postGuards.ts";
import {PostHeaderProfile} from "./components/PostHeaderProfile/PostHeaderProfile.tsx";
import {PostHeaderCommunity} from "./components/PostHeaderCommunity/PostHeaderCommunity.tsx";
import styles from './PostGeneric.module.css';
import {PostActions} from "./components/PostActions/PostActions.tsx";

type Props = {
    post: PostProfile | PostCommunity;
    fullPage?: boolean; // TODO
    onPostUpdate: VoidFunction;
}

export const PostGeneric: FC<Props> = ({ post, onPostUpdate }) => (
    <Card>
        <Flex vertical gap={16}>
            {isProfilePost(post) && <PostHeaderProfile profile={post.profile} createdAt={post.created_at} />}
            {isCommunityPost(post) && <PostHeaderCommunity community={post.community} createdAt={post.created_at} />}
            <Typography.Paragraph className={styles.postContent}>{post.content}</Typography.Paragraph>
            <Divider className={styles.divider} />
            <PostActions post={post} onPostUpdate={onPostUpdate} />
        </Flex>
    </Card>
)