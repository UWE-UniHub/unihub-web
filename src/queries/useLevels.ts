import { useQuery } from '@tanstack/react-query';
import { levelsGet } from '../api/levels/levelsGet.ts';

export const useLevels = () => useQuery({
    queryKey: ['levels'],
    queryFn: levelsGet
});
