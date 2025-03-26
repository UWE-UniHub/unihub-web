import {FC} from "react";
import {PostCommunity, PostProfile} from "../../types/domain.ts";
import {Card, Divider, Flex, Typography} from "antd";
import {isCommunityPost, isProfilePost} from "./utils/postGuards.ts";
import {PostHeaderProfile} from "./components/PostHeaderProfile/PostHeaderProfile.tsx";
import {PostHeaderCommunity} from "./components/PostHeaderCommunity/PostHeaderCommunity.tsx";
import styles from './PostGeneric.module.css';
import {PostActions} from "./components/PostActions/PostActions.tsx";
import {useNavigate} from "react-router";

type Props = {
    post: PostProfile | PostCommunity;
    fullPage?: boolean;
    onPostUpdate: VoidFunction;
}

export const PostGeneric: FC<Props> = ({ post, fullPage, onPostUpdate }) => {
    const navigate = useNavigate();

    const handlePostClick = () => {
        if(fullPage) return;
        if(isProfilePost(post)) navigate(`/profile/${post.profile.id}/${post.id}`);
        if(isCommunityPost(post)) navigate(`/community/${post.community.id}/${post.id}`);
    }

    return (
        <Card hoverable={!fullPage} onClick={handlePostClick} style={fullPage ? { flex: '1 0' } : undefined}>
            <Flex vertical gap={16}>
                {isProfilePost(post) && <PostHeaderProfile profile={post.profile} createdAt={post.created_at} />}
                {isCommunityPost(post) && <PostHeaderCommunity community={post.community} createdAt={post.created_at} />}
                <Typography.Paragraph
                    className={styles.postContent}
                    ellipsis={!fullPage ? { rows: 4, expandable: true, expanded: false } : undefined}
                >{post.content}</Typography.Paragraph>
                <Divider className={styles.divider} />
                <PostActions post={post} onPostUpdate={onPostUpdate} />
            </Flex>
        </Card>
    )
}
