import {useQuery} from "@tanstack/react-query";
import {eventsGet} from "../api/events/eventsGet.ts";

export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: eventsGet
})