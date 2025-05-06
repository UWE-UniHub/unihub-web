import {Comment} from "../types/domain.ts";
import {create} from "zustand";

type CommentsFeedStoreType = {
    feeds: Record<string, { comments: Comment[]; next: number; count: number; init: boolean; }>;
    addComments: (key: string, comments: Comment[], next: number, count: number) => void;
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
    flushComments: (key: string) => set((state) => ({
        feeds: {
            ...state.feeds,
            [key]: { comments: [], next: 0, count: 0, init: false }
        }
    }))
}))

export const useComments = (id: string) => {
    const { feeds, addComments, flushComments } = useCommentsFeedStore();

    return {
        feed: feeds[id] || { comments: [], next: 0, count: 0, init: false },
        addComments: addComments.bind(undefined, id),
        flushComments: flushComments.bind(undefined, id)
    };
};