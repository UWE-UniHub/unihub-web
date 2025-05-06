import {FC} from "react";
import {Navigate, useParams} from "react-router";
import styles from './PostPage.module.css';
import {PostGeneric} from "../../components/PostGeneric/PostGeneric.tsx";
import {usePost} from "../../queries/usePost.ts";
import {Flex, Spin} from "antd";
import {isCommunityPost, isProfilePost} from "../../components/PostGeneric/utils/postGuards.ts";
import {PostProfileCard} from "./components/PostProfileCard/PostProfileCard.tsx";
import {PostCommunityCard} from "./components/PostCommunityCard/PostCommunityCard.tsx";
import {MorePostsColumn} from "./components/MorePostsColumn/MorePostsColumn.tsx";
import {CommentsFeed} from "../../components/CommentsFeed/CommentsFeed.tsx";

export const PostPage: FC = () => {
    const { postId, profileId, communityId } = useParams();

    const { data: post, refetch } = usePost(postId!);

    if(!post) {
        return <Spin fullscreen />
    }

    if(isCommunityPost(post) && post.community.id !== communityId) {
        return <Navigate to={`/communities/${post.community.id}`} />
    }

    if(isProfilePost(post) && post.profile.id !== profileId) {
        return <Navigate to={`/profiles/${post.profile.id}`} />
    }

    return (
        <div className={styles.container}>
            <Flex vertical gap={16} className={styles.postContainer}>
                <div className={styles.postContainerInner}>
                    <PostGeneric post={post} onLikesUpdate={() => refetch()} fullPage />
                </div>
                <CommentsFeed postId={post.id} />
            </Flex>
            <Flex vertical gap={16}>
                {isProfilePost(post) && (
                    <PostProfileCard profile={post.profile} />
                )}
                {isCommunityPost(post) && (
                    <PostCommunityCard community={post.community} />
                )}
                <MorePostsColumn post={post} />
            </Flex>
        </div>
    );
}