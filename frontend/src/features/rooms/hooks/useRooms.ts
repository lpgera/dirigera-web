import { useQuery } from "@apollo/client/react";
import { useRefetch } from "@/hooks";
import { ROOMS_QUERY } from "../api/queries";
import type { RoomsQuery } from "@/components/Rooms.types.gen";

export function useRooms() {
  const { data, refetch, error, loading } = useQuery<RoomsQuery>(ROOMS_QUERY);

  useRefetch(refetch);

  return {
    rooms: data?.rooms ?? [],
    loading,
    error,
    refetch,
  };
}
