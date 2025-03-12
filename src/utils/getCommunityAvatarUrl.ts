import {API_BASE_URL} from "../constants/constants.ts";

export const getCommunityAvatarUrl = (id: string) => `${API_BASE_URL}/communities/${id}/avatar`;