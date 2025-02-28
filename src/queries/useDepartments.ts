import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../constants/constants.ts';

type DepartmentsResponse = {
    departments: string[];
};

export const useDepartments = () => {
    return useQuery<string[]>({
        queryKey: ['departments'],
        queryFn: async () => {
            const { data } = await axios.get<DepartmentsResponse>(`${API_BASE_URL}/departments/`);
            console.log("Response data:", data);
            return data.departments;
        }
    });
};
