import {FC} from "react";
import {Comment} from "../../types/domain.ts";
import {Card, Flex, Typography} from "antd";
import {CommentHeader} from "./components/CommentHeader/CommentHeader.tsx";
import styles from "./CommentGeneric.module.css";

type Props = {
    comment: Comment;
}

export const CommentGeneric: FC<Props> = ({ comment }) => (
    <Card>
        <Flex vertical gap={16}>
            <CommentHeader author={comment.author} createdAt={comment.created_at} />
            <Typography.Paragraph
                className={styles.commentContent}
            >{comment.content}</Typography.Paragraph>
        </Flex>
    </Card>
)