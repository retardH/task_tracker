import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import type { ITask } from "@/models";
import {
  type ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type PaginationState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import { statusWithIconMapping, tasks } from "@/constants";
import { format } from "date-fns";
import { MixerVerticalIcon } from "@radix-ui/react-icons";
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
import { cn } from "@/lib/utils";

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
      accessorKey: "staffId",
      header: () => {
        return <div>Staff Id</div>;
      },
      cell: ({ row }) => {
        return (
          <div className="min-w-[90px] font-medium">{row.original.staffId}</div>
        );
      },
    },
    {
      accessorKey: "staffName",
      header: "Staff Name",
      cell: ({ row }) => {
        return <div className="min-w-[120px]">{row.original.staffName}</div>;
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        return (
          <div className="min-w-[140px]">
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
          <div className="min-w-[150px]">
            {row.original.fromTime} - {row.original.toTime}
          </div>
        );
      },
    },
    {
      accessorKey: "project",
      header: "Project",
      cell: ({ row }) => {
        return <div className="min-w-[100px]">{row.original.project.name}</div>;
      },
      filterFn: (row, _, filterValue) => {
        return row.original.project.id === filterValue;
      },
    },
    {
      accessorKey: "task",
      header: "Task",
      cell: ({ row }) => {
        return <div className="min-w-[110px]">{row.original.task.name}</div>;
      },
    },
    {
      accessorKey: "subTask",
      header: "Sub-task",
      cell: ({ row }) => {
        return <div className="min-w-[110px]">{row.original.subTask.name}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div className="flex min-w-[150px] items-center justify-start gap-2">
            {statusWithIconMapping[status]}
            {status}
          </div>
        );
      },
    },
    {
      accessorKey: "remark",
      header: "Remark",
      cell: ({ row }) => {
        return (
          <div className="min-w-[300px] text-left">{row.original.remark}</div>
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

  const { data: projectsResp } = useGetProjects();
  const projectsList = projectsResp?.data ?? [];

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [visibilityState, setVisibilityState] = useState<VisibilityState>({});

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: tasks,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setVisibilityState,
    state: {
      pagination: pagination,
      columnVisibility: visibilityState,
      columnFilters: columnFilters,
    },
  });

  const staffIdFilterVal =
    (table.getColumn("staffId")?.getFilterValue() as string) ?? "";

  const projectIdFilterVal =
    (table.getColumn("project")?.getFilterValue() as string) ?? "";

  const dateFilterVal = table.getColumn("date")?.getFilterValue() as string;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex gap-4">
          <Input
            className="w-[200px]"
            name="staffId"
            placeholder="Filter by Staff Id..."
            value={staffIdFilterVal}
            onChange={(e) => {
              table
                .getColumn("staffId")
                ?.setFilterValue(e.target.value.replace(/[^\d]/g, ""));
            }}
          />
          <DatePicker
            className="w-[200px]"
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
                "w-[200px]",
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
              className="inline-flex items-center gap-2"
              onClick={() => {
                table.resetColumnFilters();
              }}
            >
              <span>Reset</span>
            </Button>
          )}
        </div>
        <div className="flex items-center gap-4">
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
      <DataTable table={table} columns={columns} />
    </div>
  );
};

export default AllTasksTable;
