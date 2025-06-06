import { FC, useEffect, useRef } from "react";
import {
    EventCommunity,
    EventProfile,
    PostCommunity,
    PostGeneric as PostGenericType,
    PostProfile
} from "../../types/domain.ts";
import {Flex, Spin} from "antd";
import { PostGeneric } from "../PostGeneric/PostGeneric.tsx";

type Props = {
    posts: (PostCommunity | PostProfile)[];
    events: (EventCommunity | EventProfile)[];
    loading: boolean;
    onScroll: VoidFunction;
    onLikesUpdate: (postId: string, likes: number, is_liked: boolean) => void;
    onPostEdit: (postId: string, data: PostGenericType) => void;
    onPostDelete: (postId: string) => void;
}

export const PostsFeed: FC<Props> = ({ posts, events, loading, onScroll, onLikesUpdate, onPostEdit, onPostDelete }) => {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastPostRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!lastPostRef.current) return;

        observerRef.current = new IntersectionObserver((entries) => {
            const lastEntry = entries[0];
            if (lastEntry.isIntersecting) {
                onScroll();
            }
        }, { threshold: 1.0 });

        observerRef.current.observe(lastPostRef.current);

        return () => observerRef.current?.disconnect();
    }, [posts]);

    return (
        <Flex vertical gap={16}>
            {posts.map((post, index) => (
                <div key={post.id} ref={index === posts.length - 1 ? lastPostRef : undefined}>
                    <PostGeneric
                        post={post}
                        events={events}
                        onLikesUpdate={onLikesUpdate}
                        onPostEdit={onPostEdit}
                        onPostDelete={onPostDelete}
                    />
                </div>
            ))}
            {loading && <Spin />}
        </Flex>
    );
};
