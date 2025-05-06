import { create } from "zustand";
import {PostCommunity, PostProfile} from "../types/domain.ts";

type PostType = PostCommunity | PostProfile;

type FeedKey = "main" | `profile-${string}` | `community-${string}`;

type FeedStoreType = {
    feeds: Record<FeedKey, { posts: PostType[]; next: number; count: number; init: boolean; }>;
    addPosts: (feedKey: FeedKey, posts: PostType[], next: number, count: number) => void;
    updateLikes: (feedKey: FeedKey, postId: string, likes: number, is_liked: boolean) => void;
    flushPosts: (feedKey: FeedKey) => void;
};

export const useFeedStore = create<FeedStoreType>((set) => ({
    feeds: {
        main: {
            posts: [],
            next: 0,
            count: 0,
            init: false
        }
    },
    addPosts: (feedKey, posts, next, count) => set((state) => {
        const existingPosts = state.feeds[feedKey].posts;
        return {
            feeds: {
                ...state.feeds,
                [feedKey]: {
                    posts: [...existingPosts, ...posts],
                    next,
                    count,
                    init: true
                },
            },
        };
    }),
    updateLikes: (feedKey, postId, likes, is_liked) => set((state) => {
        const feed = state.feeds[feedKey] || { posts: [], next: 0 };
        return {
            feeds: {
                ...state.feeds,
                [feedKey]: {
                    posts: feed.posts.map(post =>
                        post.id === postId ? { ...post, likes, is_liked } : post
                    ),
                    next: feed.next,
                    count: feed.count,
                    init: true
                },
            },
        };
    }),
    flushPosts: (feedKey) => set((state) => ({
        feeds: {
            ...state.feeds,
            [feedKey]: { posts: [], next: 0, count: 0, init: false }
        }
    }))
}));

export const useFeed = (type: "main" | "profile" | "community", id?: string) => {
    const feedKey: FeedKey = type === "main" ? "main" : `${type}-${id}`;
    const { feeds, addPosts, updateLikes, flushPosts } = useFeedStore();

    return {
        feed: feeds[feedKey] || { posts: [], next: 0, count: 0, init: false },
        addPosts: addPosts.bind(undefined, feedKey),
        updateLikes: updateLikes.bind(undefined, feedKey),
        flushPosts: flushPosts.bind(undefined, feedKey)
    };
};