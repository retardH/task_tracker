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
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  table: TableType<TData>;
}
const DataTable = <TData, TValue>({
  columns,
  table,
}: DataTableProps<TData, TValue>) => {
  const { pageIndex, pageSize } = table.getState().pagination;
  const rowCount = table.getRowCount();
  const currentEndRange = !table.getCanNextPage()
    ? rowCount
    : pageSize * (pageIndex + 1);
  const currentStartRange = pageSize * pageIndex + 1;

  return (
    <>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-primary hover:bg-primary"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="py-4 text-center text-white"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
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
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm">Rows per page :&nbsp;&nbsp;</span>
          <Select
            defaultValue={`${table.getState().pagination.pageSize}`}
            onValueChange={(val) => table.setPageSize(+val)}
          >
            <SelectTrigger className="w-[60px]">
              <SelectValue placeholder="Page Size" />
            </SelectTrigger>
            <SelectContent>
              {["5", "10", "15", "20", "25"].map((n) => {
                return (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-sm">
            {table.getRowCount() === 0
              ? "0 item"
              : `${currentStartRange}-${currentEndRange} of ${rowCount} items`}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.firstPage()}
            >
              <DoubleArrowLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="flex items-center gap-1"
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="flex items-center gap-1"
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              <ChevronRightIcon />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={!table.getCanNextPage()}
              onClick={() => table.lastPage()}
            >
              <DoubleArrowRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTable;
