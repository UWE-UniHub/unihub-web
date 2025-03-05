import {API_BASE_URL} from "../constants/constants.ts";

export const getProfileAvatarUrl = (id: string) => `${API_BASE_URL}/profiles/${id}/avatar`;