import {
  type ColumnDef,
  flexRender,
  type Table as TableType,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";
import { SelectValue } from "@radix-ui/react-select";
import { Button } from "./button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  table: TableType<TData>;
}
const DataTable = <TData, TValue>({
  columns,
  table,
}: DataTableProps<TData, TValue>) => {
  return (
    <>
      <div className="rounded-md overflow-hidden border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-primary hover:bg-primary/90"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className=" text-white" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
      <div className="flex items-center justify-between mt-2">
        <Select
          defaultValue={`${table.getState().pagination.pageSize}`}
          onValueChange={(val) => table.setPageSize(+val)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Page Size" />
          </SelectTrigger>
          <SelectContent>
            {["5", "10", "15", "20", "25"].map((n) => {
              return (
                <SelectItem key={n} value={n}>
                  Show {n} items
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="flex items-center gap-1"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <ChevronLeftIcon /> <span>Prev</span>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-1"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <span>Next</span>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </>
  );
};

export default DataTable;
