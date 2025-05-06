import {FC, useState} from "react";
import {PostCommunity, PostProfile} from "../../../../types/domain.ts";
import {App, Avatar, Button, ButtonProps, Flex, Popover, Tooltip} from "antd";
import {LikeOutlined} from "@ant-design/icons";
import styles from './PostActions.module.css';
import {usePostLikes} from "../../../../queries/usePostLikes.ts";
import {ProfileAvatar} from "../../../ProfileAvatar/ProfileAvatar.tsx";
import {ProfilesListModal} from "../../../ProfilesListModal/ProfilesListModal.tsx";
import {postsPostIdLikesPost} from "../../../../api/posts/postsPostIdLikesPost.ts";
import {postsPostIdLikesDelete} from "../../../../api/posts/postsPostIdLikesDelete.ts";

type Props = {
    post: PostProfile | PostCommunity;
    onLikesUpdate: (likes: number) => void;
}

export const PostActions: FC<Props> = ({ post, onLikesUpdate }) => {
    const { message } = App.useApp();
    const { data: likes, refetch } = usePostLikes(post.id);

    const [isLiked, setIsLiked] = useState(post.is_liked);
    const [likesCount, setLikesCount] = useState(post.likes);


    const handleLike: ButtonProps['onClick'] = (e) => {
        e.stopPropagation();
        postsPostIdLikesPost(post.id).then(() => {
            setIsLiked(true);
            setLikesCount((prev) => prev + 1);
            void refetch();
        }).catch((e) => {
            console.error(e);
            void message.error(`Error (${JSON.stringify(e)})`);
        })
    }

    const handleUnlike: ButtonProps['onClick'] = (e) => {
        e.stopPropagation();
        postsPostIdLikesDelete(post.id).then(() => {
            setIsLiked(false);
            setLikesCount((prev) => Math.max(prev - 1, 0));
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
                {isLiked ? (
                    <Button
                        type="text"
                        icon={<LikeOutlined />}
                        onClick={handleUnlike}
                    >Unlike ({likesCount})</Button>
                ) : (
                    <Button
                        type="link"
                        icon={<LikeOutlined />}
                        onClick={handleLike}
                    >Like ({likesCount})</Button>
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