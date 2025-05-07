import {FC, useEffect, useRef} from "react";
import {Comment} from "../../types/domain.ts";
import {Flex, Spin} from "antd";
import {CommentGeneric} from "../CommentGeneric/CommentGeneric.tsx";

type Props = {
    comments: Comment[];
    loading: boolean;
    onScroll: VoidFunction;
    onCommentEdit: (commentId: string, data: Comment) => void;
    onCommentDelete: (commentId: string) => void;
}

export const CommentsFeedPure: FC<Props> = ({ comments, loading, onScroll, onCommentEdit, onCommentDelete }) => {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastCommentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!lastCommentRef.current) return;

        observerRef.current = new IntersectionObserver((entries) => {
            const lastEntry = entries[0];
            if (lastEntry.isIntersecting) {
                onScroll();
            }
        }, { threshold: 1.0 });

        observerRef.current.observe(lastCommentRef.current);

        return () => observerRef.current?.disconnect();
    }, [comments]);

    return (
        <Flex vertical gap={16}>
            {comments.map((comment, index) => (
                <div key={comment.id} ref={index === comments.length - 1 ? lastCommentRef : undefined}>
                    <CommentGeneric
                        comment={comment}
                        onCommentEdit={onCommentEdit}
                        onCommentDelete={onCommentDelete}
                    />
                </div>
            ))}
            {loading && <Spin />}
        </Flex>
    );
}