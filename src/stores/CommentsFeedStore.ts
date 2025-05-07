import {Comment} from "../types/domain.ts";
import {create} from "zustand";

type CommentsFeedStoreType = {
    feeds: Record<string, { comments: Comment[]; next: number; count: number; init: boolean; }>;
    addComments: (key: string, comments: Comment[], next: number, count: number) => void;
    updateComment: (key: string, commentId: string, data: Comment) => void;
    deleteComment: (key: string, commentId: string) => void;
    flushComments: (key: string) => void;
}

export const useCommentsFeedStore = create<CommentsFeedStoreType>((set) => ({
    feeds: {},
    addComments: (key: string, comments: Comment[], next: number, count: number) => set((state) => {
        const existingComments = state.feeds[key].comments;
        return {
            feeds: {
                ...state.feeds,
                [key]: {
                    comments: [...existingComments, ...comments],
                    next,
                    count,
                    init: true
                },
            },
        };
    }),
    updateComment: (key: string, commentId: string, data: Comment) => set((state) => {
        const feed = state.feeds[key] || { comments: [], next: 0, count: 0, init: false };
        return {
            feeds: {
                ...state.feeds,
                [key]: {
                    comments: feed.comments.map(comment =>
                        comment.id === commentId ? data : comment
                    ),
                    next: feed.next,
                    count: feed.count,
                    init: true
                },
            },
        };
    }),
    deleteComment: (key: string, commentId: string) => set((state) => {
        const feed = state.feeds[key] || { comments: [], next: 0, count: 0, init: false };
        return {
            feeds: {
            ...state.feeds,
                    [key]: {
                    comments: feed.comments.filter(comment => comment.id !== commentId),
                    next: feed.next,
                    count: feed.count,
                    init: true
                },
            },
        };
    }),
    flushComments: (key: string) => set((state) => ({
        feeds: {
            ...state.feeds,
            [key]: { comments: [], next: 0, count: 0, init: false }
        }
    }))
}))

export const useComments = (id: string) => {
    const { feeds, addComments, updateComment, deleteComment, flushComments } = useCommentsFeedStore();

    return {
        feed: feeds[id] || { comments: [], next: 0, count: 0, init: false },
        addComments: addComments.bind(undefined, id),
        updateComment: updateComment.bind(undefined, id),
        deleteComment: deleteComment.bind(undefined, id),
        flushComments: flushComments.bind(undefined, id)
    };
};