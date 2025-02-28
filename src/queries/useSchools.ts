import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../constants/constants.ts';

type SchoolsResponse = {
    schools: string[];
};

export const useSchools = () => {
    return useQuery<string[]>({
        queryKey: ['schools'],
        queryFn: async () => {
            const { data } = await axios.get<SchoolsResponse>(`${API_BASE_URL}/schools/`);
            console.log("Response data:", data);
            return data.schools;
        }
    });
};
