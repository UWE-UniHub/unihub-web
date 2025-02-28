import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../constants/constants.ts';

type LevelsResponse = {
    levels: string[];
};

export const useLevels = () => {
    return useQuery<string[]>({
        queryKey: ['levels'],
        queryFn: async () => {
            const { data } = await axios.get<LevelsResponse>(`${API_BASE_URL}/levels/`);
            console.log("Response data:", data);
            return data.levels;
        }
    });
};
