import {FC, useState} from "react";
import {EventCommunity, EventProfile, PostCommunity, PostGeneric as PostGenericType, PostProfile} from "../../types/domain.ts";
import {App, Card, Divider, Flex, Typography} from "antd";
import {isCommunityPost, isProfilePost} from "./utils/postGuards.ts";
import {PostHeaderProfile} from "./components/PostHeaderProfile/PostHeaderProfile.tsx";
import {PostHeaderCommunity} from "./components/PostHeaderCommunity/PostHeaderCommunity.tsx";
import styles from './PostGeneric.module.css';
import {PostActions} from "./components/PostActions/PostActions.tsx";
import {useNavigate} from "react-router";
import {PostImage} from "./components/PostImage/PostImage.tsx";
import {EventPreview} from "../EventPreview/EventPreview.tsx";
import {LockOutlined, TagOutlined} from "@ant-design/icons";
import {capitalizeFirstLetter} from "../../utils/capitalizeFirstLetter.ts";
import {postsPostIdDelete} from "../../api/posts/postsPostIdDelete.ts";
import {PostEditor} from "../PostEditor/PostEditor.tsx";

type Props = {
    post: PostProfile | PostCommunity;
    events: (EventProfile | EventCommunity)[];
    fullPage?: boolean;
    onLikesUpdate: (postId: string, likes: number, is_liked: boolean) => void;
    onPostEdit: (postId: string, data: PostGenericType) => void;
    onPostDelete: (postId: string) => void;
}

export const PostGeneric: FC<Props> = ({ post, events, fullPage, onLikesUpdate, onPostEdit, onPostDelete }) => {
    const navigate = useNavigate();
    const { modal, message } = App.useApp();

    const [editing, setEditing] = useState(false);
    const handleEdit = () => setEditing(true);

    const handlePostClick = () => {
        if(fullPage || editing) return;
        if(isProfilePost(post)) navigate(`/profile/${post.profile.id}/${post.id}`);
        if(isCommunityPost(post)) navigate(`/community/${post.community.id}/${post.id}`);
    }

    const handleDelete = async () => {
        if(await modal.confirm({ title: 'Are you sure you want to delete this post?' })) {
            try {
                await postsPostIdDelete(post.id);
                void message.success('Post deleted!');
                onPostDelete(post.id);
            } catch(e) {
                console.error(e);
                void message.error(JSON.stringify(e));
            }
        }
    }

    return (
        <Card
            hoverable={!fullPage}
            onClick={handlePostClick}
            style={fullPage ? { flex: '1 0' } : undefined}
            classNames={{ body: editing ? styles.editingBody : undefined }}
        >
            {editing ? (
                <PostEditor
                    target={isProfilePost(post) ? post.profile : post.community}
                    edit={post}
                    events={events}
                    onPost={(p) => onPostEdit(post.id, p as PostGenericType)}
                    onCancel={() => setEditing(false)}
                />
            ) : (
                <Flex vertical gap={16}>
                    {isProfilePost(post) && (
                        <PostHeaderProfile
                            editable={post.is_editable}
                            profile={post.profile}
                            createdAt={post.created_at}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                    {isCommunityPost(post) && (
                        <PostHeaderCommunity
                            editable={post.is_editable}
                            community={post.community}
                            createdAt={post.created_at}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                    <Typography.Paragraph
                        className={styles.postContent}
                        ellipsis={!fullPage ? { rows: 4, expandable: true, expanded: false } : undefined}
                    >{post.content}</Typography.Paragraph>
                    <PostImage postId={post.id} />
                    {post.event && <EventPreview event={post.event} clickable />}
                    {post.hidden && (
                        <Typography.Text type="secondary">
                            <Flex gap={4}>
                                <LockOutlined />
                                Only visible to subscribers
                            </Flex>
                        </Typography.Text>
                    )}
                    {post.tags && (
                        <Typography.Text type="secondary">
                            <Flex gap={4}>
                                <TagOutlined />
                                {post.tags?.split(',').map(capitalizeFirstLetter).join(', ')}
                            </Flex>
                        </Typography.Text>
                    )}
                    <Divider className={styles.divider} />
                    <PostActions post={post} onLikesUpdate={(likes, is_liked) => onLikesUpdate(post.id, likes, is_liked)} />
                </Flex>
            )}
        </Card>
    )
}
