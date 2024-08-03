import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CaretSortIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";

interface MonthData {
  month: string;
  [year: string]: number | string;
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getMonthIndex = (month: string) => monthNames.indexOf(month);

export default function MonthlyTable({ data }: { data: MonthData[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns: ColumnDef<MonthData>[] = useMemo(() => {
    if (data.length === 0) return [];

    const yearColumns: ColumnDef<MonthData>[] = Object.keys(data[0])
      .filter((key) => key !== "month")
      .map((year) => ({
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
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue(year));
          const formatted = new Intl.NumberFormat("ko-KR", {
            style: "currency",
            currency: "KRW",
          }).format(amount);
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
        sortingFn: (rowA, rowB, columnId) => {
          const monthA = getMonthIndex(rowA.getValue(columnId));
          const monthB = getMonthIndex(rowB.getValue(columnId));
          return monthA - monthB;
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
          const formatted = new Intl.NumberFormat("ko-KR", {
            style: "currency",
            currency: "KRW",
          }).format(total);
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  column.getCanHide() &&
                  column.id !== "month" &&
                  column.id !== "total"
              )
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}년
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
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
                    <TableCell key={cell.id} className="text-center">
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
    </div>
  );
}
