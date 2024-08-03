import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CampaignData, MonthlyTopDataType } from "../hooks/useTopData";
import { KWRformatter } from "@/lib/formatter";

type TopTableProps = {
  data: MonthlyTopDataType[];
  month: number;
};

export default function TopCampaignsTable({ data, month }: TopTableProps) {
  const currentMonthData = data.find((item) => item.month === month);
  const tableData = currentMonthData ? currentMonthData.allData : [];

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-4">
        <h2 className="text-2xl font-bold">Campaign Data</h2>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {currentMonthData && (
        <div className="mt-4 text-right">
          <p className="font-semibold">
            Total Revenue: {KWRformatter.format(currentMonthData.totalRevenue)}
          </p>
        </div>
      )}
    </div>
  );
}

const columns: ColumnDef<CampaignData>[] = [
  {
    accessorKey: "name",
    header: "Campaign Name",
  },
  {
    accessorKey: "revenue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Revenue
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const value = Number(getValue());
      return (
        <div className="text-right font-medium">
          {KWRformatter.format(value)}
        </div>
      );
    },
  },
  {
    accessorKey: "percentage",
    header: "Percentage",
    cell: ({ getValue }) => {
      const value = Number(getValue());
      return <div className="text-right">{value.toFixed(2)}%</div>;
    },
  },
];
