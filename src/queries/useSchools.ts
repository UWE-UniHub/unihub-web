import { useQuery } from '@tanstack/react-query';
import { schoolsGet } from '../api/schools/schoolsGet.ts';

export const useSchools = () => useQuery({
    queryKey: ['schools'],
    queryFn: schoolsGet
});