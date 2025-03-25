import {FC, useState} from "react";
import {PostCommunity, PostProfile} from "../../../../types/domain.ts";
import {App, Avatar, Button, Flex, Popover, Tooltip} from "antd";
import {LikeOutlined} from "@ant-design/icons";
import styles from './PostActions.module.css';
import {usePostLikes} from "../../../../queries/usePostLikes.ts";
import {ProfileAvatar} from "../../../ProfileAvatar/ProfileAvatar.tsx";
import {ProfilesListModal} from "../../../ProfilesListModal/ProfilesListModal.tsx";
import {postsPostIdLikesPost} from "../../../../api/posts/postsPostIdLikesPost.ts";
import {postsPostIdLikesDelete} from "../../../../api/posts/postsPostIdLikesDelete.ts";

type Props = {
    post: PostProfile | PostCommunity;
    onPostUpdate: VoidFunction;
}

export const PostActions: FC<Props> = ({ post, onPostUpdate }) => {
    const { message } = App.useApp();
    const { data: likes, refetch } = usePostLikes(post.id);

    const handleLike = () => {
        postsPostIdLikesPost(post.id).then(() => {
            onPostUpdate();
            void refetch();
        }).catch((e) => {
            console.error(e);
            void message.error(`Error (${JSON.stringify(e)})`);
        })
    }

    const handleUnlike = () => {
        postsPostIdLikesDelete(post.id).then(() => {
            onPostUpdate();
            void refetch();
        }).catch((e) => {
            console.error(e);
            void message.error(`Error (${JSON.stringify(e)})`);
        })
    }

    const [popoverOpen, setPopoverOpen] = useState(false);
    const [listOpen, setListOpen] = useState(false);
    const popoverContent = (
        <Flex className={styles.likesPreviewContainer} onClick={() => { setPopoverOpen(false); setListOpen(true) }}>
            {likes?.slice(0, 5).map((like) => (
                <Tooltip title={`${like.first_name} ${like.last_name}`}>
                    <ProfileAvatar key={like.id} profile={like} version={0} size={32} />
                </Tooltip>
            ))}
            {likes && likes.length > 5 && (
                <Avatar size={32} className={styles.likesPreviewMore}>+{likes.length - 5}</Avatar>
            )}
        </Flex>
    )

    return (
        <Flex>
            <Popover
                content={popoverContent}
                open={popoverOpen}
                onOpenChange={setPopoverOpen}
            >
                {post.is_liked && (
                    <Button
                        type="text"
                        icon={<LikeOutlined />}
                        onClick={handleUnlike}
                    >Unlike ({post.likes})</Button>
                )}
                {!post.is_liked && (
                    <Button
                        type="link"
                        icon={<LikeOutlined />}
                        onClick={handleLike}
                    >Like ({post.likes})</Button>
                )}
            </Popover>
            <ProfilesListModal
                title="Likes"
                open={listOpen}
                onClose={() => setListOpen(false)}
                profiles={likes}
            />
        </Flex>
    )
}