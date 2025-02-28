import { useQuery } from '@tanstack/react-query';
import { departmentsGet } from '../api/departments/departmentsGet.ts';

export const useDepartments = () => useQuery({
    queryKey: ['departments'],
    queryFn: departmentsGet
});
