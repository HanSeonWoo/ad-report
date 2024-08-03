import { fetchAdSettlementData } from "@/services/settlement";
import { useQuery } from "@tanstack/react-query";

type Params = {
  search_year: number;
  search_month?: number;
};
export const useGetData = ({ search_year, search_month }: Params) => {
  const result = useQuery({
    queryKey: ["adSettlement", { search_year, search_month }] as const,
    queryFn: () => fetchAdSettlementData({ search_year, search_month }),
  });

  return result;
};
