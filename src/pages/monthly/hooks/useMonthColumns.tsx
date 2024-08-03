import { useMemo } from "react";
import { MonthYearDataType } from "./useMonthData";
import { ColumnDef } from "@tanstack/react-table";
import { ResultType } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";

type Params = {
  resultType: ResultType;
  data: MonthYearDataType[];
};
export const useMonthColumns = ({ data, resultType }: Params) => {
  const formatter = useMemo(() => {
    return new Intl.NumberFormat(
      "ko-KR",
      resultType === "Complete"
        ? {}
        : {
            style: "currency",
            currency: "KRW",
          }
    );
  }, [resultType]);

  const columns: ColumnDef<MonthYearDataType>[] = useMemo(() => {
    if (data.length === 0) return [];

    const yearColumns: ColumnDef<MonthYearDataType>[] = Object.keys(
      data[0]
    ).map((year) => ({
      accessorKey: year,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {year}년
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => {
        const value = Number(getValue());
        const formatted = formatter.format(value);
        return <div className="text-right font-medium">{formatted}</div>;
      },
    }));

    return [
      {
        accessorKey: "month",
        header: ({ column }) => {
          return (
            <Button
              variant={"ghost"}
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              월
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => <div>{row.index + 1}월</div>,
        sortingFn: (rowA, rowB) => {
          return rowA.index - rowB.index;
        },
      },
      ...yearColumns,
      {
        accessorKey: "total",
        header: ({ column }) => {
          return (
            <Button
              variant={"ghost"}
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              합계
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          );
        },

        cell: ({ row }) => {
          const total = row
            .getVisibleCells()
            .filter(
              ({ column }) => column.id !== "month" && column.id !== "total"
            )
            .reduce(
              (sum, key) =>
                sum + (parseFloat(row.getValue(key.column.id)) || 0),
              0
            );
          const formatted = formatter.format(total);
          return <div className="text-right font-medium">{formatted}</div>;
        },
        sortingFn: (rowA, rowB) => {
          const totalA = rowA
            .getVisibleCells()
            .filter(
              ({ column }) => column.id !== "month" && column.id !== "total"
            )
            .reduce(
              (sum, key) =>
                sum + (parseFloat(rowA.getValue(key.column.id)) || 0),
              0
            );
          const totalB = rowB
            .getVisibleCells()
            .filter(
              ({ column }) => column.id !== "month" && column.id !== "total"
            )
            .reduce(
              (sum, key) =>
                sum + (parseFloat(rowB.getValue(key.column.id)) || 0),
              0
            );
          return totalA - totalB;
        },
      },
    ];
  }, [data]);

  return { columns };
};
