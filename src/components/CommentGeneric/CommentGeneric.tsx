import {FC, useState} from "react";
import {Comment} from "../../types/domain.ts";
import {App, Card, Flex, Typography} from "antd";
import {CommentHeader} from "./components/CommentHeader/CommentHeader.tsx";
import styles from "./CommentGeneric.module.css";
import {postsPostIdCommentsCommentIdDelete} from "../../api/posts/postsPostIdCommentsCommentIdDelete.ts";
import {PostEditor} from "../PostEditor/PostEditor.tsx";
import {useOwnProfile} from "../../stores/OwnProfileStore.ts";

type Props = {
    comment: Comment;
    onCommentEdit: (commentId: string, data: Comment) => void;
    onCommentDelete: (commentId: string) => void;
}

export const CommentGeneric: FC<Props> = ({ comment, onCommentEdit, onCommentDelete }) => {
    const { modal, message } = App.useApp();
    const { profile } = useOwnProfile();
    const ownComment = profile?.id === comment.author.id;

    const [editing, setEditing] = useState(false);
    const handleEdit = () => setEditing(true);

    const handleDelete = async () => {
        if(await modal.confirm({ title: 'Are you sure you want to delete this post?' })) {
            try {
                await postsPostIdCommentsCommentIdDelete(comment.post, comment.id);
                void message.success('Comment deleted!');
                onCommentDelete(comment.id);
            } catch(e) {
                console.error(e);
                void message.error(JSON.stringify(e));
            }
        }
    }

    return (
        <Card classNames={{ body: editing ? styles.editingBody : undefined }}>
            {editing ? (
                <PostEditor
                    target={comment.post}
                    edit={comment}
                    events={[]}
                    onPost={(p) => onCommentEdit(comment.id, p as Comment)}
                    onCancel={() => setEditing(false)}
                />
            ) : (
                <Flex vertical gap={16}>
                    <CommentHeader
                        author={comment.author}
                        createdAt={comment.created_at}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        editable={ownComment}
                    />
                    <Typography.Paragraph
                        className={styles.commentContent}
                    >{comment.content}</Typography.Paragraph>
                </Flex>
            )}
        </Card>
    )
}