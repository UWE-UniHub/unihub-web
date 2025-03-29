import {API_BASE_URL} from "../constants/constants.ts";

export const getPostImageUrl = (postId: string) => `${API_BASE_URL}/posts/${postId}/img`;