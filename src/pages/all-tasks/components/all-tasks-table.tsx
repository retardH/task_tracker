import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import type { ITask } from "@/models";
import {
  type ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import { statusWithIconMapping } from "@/constants";
import { format } from "date-fns";
import { CaretSortIcon, MixerVerticalIcon } from "@radix-ui/react-icons";
import DatePicker from "@/components/ui/date-picker";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetProjects } from "@/services/setup";
import { cn, formatTime } from "@/lib/utils";
import { useGetAllTasks } from "@/services/task";

const AllTasksTable = () => {
  const columns: ColumnDef<ITask>[] = [
    // {
    //   id: "staff",
    //   header: "Staff",
    //   cell: ({ row }) => {
    //     return (
    //       <div className="flex min-w-[120px] flex-col items-start gap-1">
    //         <h4 className="font-medium">{row.original.staffName}</h4>
    //         <span className="text-xs text-accent-foreground">
    //           {row.original.staffId}
    //         </span>
    //       </div>
    //     );
    //   },
    // },
    {
      id: "staffId",
      header: () => {
        return <div>Id</div>;
      },
      cell: ({ row }) => {
        return (
          <div className="min-w-[90px] font-medium">
            {row.original.staff?.staffId}
          </div>
        );
      },
    },
    {
      accessorKey: "staff",
      header: "Name",
      cell: ({ row }) => {
        return <div className="min-w-[120px]">{row.original.staff?.name}</div>;
      },
      filterFn: (row, _, filterValue) => {
        return `${row.original.staff?.staffId}`.includes(`${filterValue}`);
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <div className="flex items-center gap-2">
            <h4>Date</h4>
            <CaretSortIcon
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
              }}
            />
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="min-w-[120px]">
            {format(row.original.date, "dd MMMM, yyyy")}
          </div>
        );
      },
      filterFn: (row, _, filterValue) => {
        return (
          format(row.original.date, "dd MMMM, yyyy") ===
          format(filterValue as string, "dd MMMM, yyyy")
        );
      },
      sortingFn: (rowA, rowB) => {
        const rowADate = new Date(rowA.original.date).getTime();
        const rowBDate = new Date(rowB.original.date).getTime();
        return rowADate - rowBDate;
      },
    },
    // {
    //   accessorKey: "fromTime",
    //   header: "From",
    //   cell: ({ row }) => {
    //     return <div className="min-w-[120px]">{row.original.fromTime}</div>;
    //   },
    // },
    // {
    //   accessorKey: "toTime",
    //   header: "To",
    //   cell: ({ row }) => {
    //     return <div className="min-w-[120px]">{row.original.toTime}</div>;
    //   },
    // },
    {
      id: "duration",
      header: "Duration",
      cell: ({ row }) => {
        return (
          <div className="min-w-[160px]">
            {formatTime(row.original.fromTime)}&nbsp;&nbsp;-&nbsp;&nbsp;
            {formatTime(row.original.toTime)}
          </div>
        );
      },
    },
    {
      accessorKey: "project",
      header: "Project",
      cell: ({ row }) => {
        return <div className="min-w-[140px]">{row.original.project.name}</div>;
      },
      filterFn: (row, _, filterValue) => {
        return row.original.project.id === filterValue;
      },
    },
    {
      accessorKey: "task",
      header: "Task",
      cell: ({ row }) => {
        return (
          <div className="min-w-[120px]">{row.original.mainTask.name}</div>
        );
      },
    },
    {
      accessorKey: "subTask",
      header: "Sub-task",
      cell: ({ row }) => {
        return <div className="min-w-[140px]">{row.original.subTask.name}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div className="flex min-w-[120px] items-center justify-start gap-2">
            {statusWithIconMapping[status]}
            {+status === 1 ? "In Progress" : "Complete"}
          </div>
        );
      },
    },
    {
      accessorKey: "remark",
      header: "Remark",
      cell: ({ row }) => {
        return (
          <div className="min-w-[300px] text-left">
            {row.original.remark || "-"}
          </div>
        );
      },
    },
    // {
    //   id: "actions",
    //   header: "",
    //   cell: () => {
    //     return (
    //       <div className="flex min-w-[80px] justify-end">
    //         <Button size={"icon"} variant={"ghost"}>
    //           <Pencil1Icon />
    //         </Button>
    //         <Button size={"icon"} variant={"ghost"}>
    //           <TrashIcon />
    //         </Button>
    //       </div>
    //     );
    //   },
    // },
  ];

  const { data: allTasksResp, isLoading: isAllTasksLoading } = useGetAllTasks();
  const allTasksList = allTasksResp?.data ?? [];

  const { data: projectsResp } = useGetProjects();
  const projectsList = projectsResp?.data ?? [];

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [visibilityState, setVisibilityState] = useState<VisibilityState>({});

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sortingState, setSortingState] = useState<SortingState>([
    {
      id: "date",
      desc: true,
    },
  ]);

  const table = useReactTable({
    data: allTasksList,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setVisibilityState,
    onSortingChange: setSortingState,
    state: {
      pagination: pagination,
      columnVisibility: visibilityState,
      columnFilters: columnFilters,
      sorting: sortingState,
    },
  });

  const staffIdFilterVal =
    (table.getColumn("staff")?.getFilterValue() as string) ?? "";

  const projectIdFilterVal =
    (table.getColumn("project")?.getFilterValue() as string) ?? "";

  const dateFilterVal = table.getColumn("date")?.getFilterValue() as string;

  return (
    <div>
      <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row">
          <Input
            className="w-full md:w-[200px]"
            name="staffId"
            placeholder="Search by Staff Id..."
            value={staffIdFilterVal}
            onChange={(e) => {
              table
                .getColumn("staff")
                ?.setFilterValue(e.target.value.replace(/[^\d]/g, ""));
            }}
          />
          <DatePicker
            className="w-full md:w-[200px]"
            placeholder="Filter by date..."
            date={dateFilterVal ? new Date(dateFilterVal) : undefined}
            onDateChange={(date) => {
              table.getColumn("date")?.setFilterValue(date);
            }}
          />
          <Select
            value={projectIdFilterVal}
            onValueChange={(val) => {
              table.getColumn("project")?.setFilterValue(val);
            }}
          >
            <SelectTrigger
              className={cn(
                "w-full md:w-[200px]",
                projectIdFilterVal === "" && "text-muted-foreground",
              )}
            >
              <SelectValue placeholder="Filter by Project..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {projectsList.map((p) => {
                  return (
                    <SelectItem key={p.id} value={`${p.id}`}>
                      {p.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          {table.getState().columnFilters.length > 0 && (
            <Button
              variant="ghost"
              className="hidden items-center gap-2 md:inline-flex"
              onClick={() => {
                table.resetColumnFilters();
              }}
            >
              <span>Reset</span>
            </Button>
          )}
        </div>
        <div className="flex w-full items-center justify-between gap-4 md:w-auto">
          {table.getState().columnFilters.length > 0 && (
            <Button
              variant="ghost"
              className="inline-flex items-center gap-2 md:hidden"
              onClick={() => {
                table.resetColumnFilters();
              }}
            >
              <span>Reset</span>
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto inline-flex items-center gap-1"
              >
                <MixerVerticalIcon />
                <span>View</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(val) => column.toggleVisibility(!!val)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <DataTable table={table} columns={columns} loading={isAllTasksLoading} />
    </div>
  );
};

export default AllTasksTable;
