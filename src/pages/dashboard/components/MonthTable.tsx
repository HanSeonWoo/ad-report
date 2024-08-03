import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { KWRformatter, Numberformatter } from "@/lib/formatter";
import { CampaignType, MonthlyDataType } from "@/services/settlement";
import { getLabel } from "@/lib/getLabel";
import { ResultType } from "@/lib/type";

type Props = {
  data: MonthlyDataType[];
};

export default function MonthTable({ data }: Props) {
  const tableData = useMemo(() => {
    return data.flatMap((month) => month.App.flatMap((app) => app.Campaign));
  }, [data]);
  console.log("🚀 ~ tableData ~ tableData:", tableData);

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
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

const columns: ColumnDef<CampaignType>[] = [
  {
    accessorKey: "CampaignName",
    header: "Campaign Name",
  },
  {
    accessorKey: "Revenue",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {getLabel(column.id as ResultType)}
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
    accessorKey: "Commission",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {getLabel(column.id as ResultType)}
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
    accessorKey: "Complete",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {getLabel(column.id as ResultType)}
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const value = Number(getValue());
      return (
        <div className="text-right font-medium">
          {Numberformatter.format(value)}
        </div>
      );
    },
  },
  {
    accessorKey: "RevenuePerComplete",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {getLabel(column.id as ResultType)}
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const revenue = Number(row.getValue("Revenue"));
      const complete = Number(row.getValue("Complete"));
      return (
        <div className="text-right font-medium">
          {complete === 0 ? 0 : KWRformatter.format(Number(revenue / complete))}
        </div>
      );
    },
  },
];
