import {
  AdSettlementParams,
  fetchAdSettlementData,
} from "@/services/settlement";
import { useQuery } from "@tanstack/react-query";

export default function Test() {
  const search_year = 2019;
  let search_month;
  const { data, isError, isLoading } = useQuery({
    queryKey: ["adSettlement", { search_year, search_month }],
    queryFn: ({ queryKey }) => {
      console.log("queryKey", queryKey, queryKey[1]);
      return fetchAdSettlementData(queryKey[1] as AdSettlementParams);
    },
  });

  console.log(data);
  console.log(JSON.stringify(data));
  return <div>Text</div>;
}
