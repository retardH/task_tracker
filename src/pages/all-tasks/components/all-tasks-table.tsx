import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { ITask } from "@/models";
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
import { tasks } from "@/constants";
import { format } from "date-fns";
import { CheckCircledIcon, LapTimerIcon, MixerVerticalIcon } from "@radix-ui/react-icons";
import DatePicker from "@/components/ui/date-picker";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
const statusIconMapping: Record<string, React.ReactNode> = {
  "In Progress": <LapTimerIcon className="h-4 w-4" />,
  Complete: <CheckCircledIcon className="h-4 w-4" />,
};

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
          <div className="font-medium min-w-[100px]">
            {row.original.staffId}
          </div>
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
          <div className="min-w-[150px]">
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
        return <div className="min-w-[120px]">{row.original.project.name}</div>;
      },
      filterFn: (row, _, filterValue) => {
        return row.original.project.name === filterValue;
      },
    },
    {
      accessorKey: "task",
      header: "Task",
      cell: ({ row }) => {
        return <div className="min-w-[120px]">{row.original.task.name}</div>;
      },
    },
    {
      accessorKey: "subTask",
      header: "Sub-task",
      cell: ({ row }) => {
        return <div className="min-w-[120px]">{row.original.subTask.name}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div className="flex min-w-[150px] items-center justify-center gap-2">
            {statusIconMapping[status]}
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

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [visibilityState, setVisibilityState] = useState<VisibilityState>({});

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [selectedProject, setSelectedProject] = useState<string | undefined>();


  const table = useReactTable({
    data: tasks,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange:setVisibilityState,
    state: {
      pagination: pagination,
      columnVisibility: visibilityState,
      columnFilters: columnFilters,
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-2">
        <Input className="w-[200px]"
            name="staffId"
            placeholder="Filter by Staff Id..."
            value={
              (table.getColumn("staffId")?.getFilterValue() as string) ?? ""
            }
            onChange={(e) => {
              table
                .getColumn("staffId")
                ?.setFilterValue(e.target.value.replace(/[^\d]/g, ""));
            }}
          />
          <DatePicker
            className="w-[200px]"
            placeholder="Filter by date"
            date={
              table.getColumn("date")?.getFilterValue()
                ? new Date(table.getColumn("date")?.getFilterValue() as string)
                : undefined
            }
            onDateChange={(date) => {
              table.getColumn("date")?.setFilterValue(date);
            }}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="inline-flex items-center gap-1"
              >
                <MixerVerticalIcon />
                <span>
                  {selectedProject ? (
                     <span>{selectedProject}</span>
                  ) : (
                    "Filter by project"
                  )}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* <DropdownMenuLabel>Filter by Project</DropdownMenuLabel> */}
              {tasks
                .map((task) => task.project.name)
                .filter((value, index, self) => self.indexOf(value) === index) // Unique projects
                .map((project) => (
                  <DropdownMenuItem
                    key={project}
                    onClick={() => {
                      table.getColumn("project")?.setFilterValue(project);
                      setSelectedProject(project);
                    }}
                  >
                    {project}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {table.getState().columnFilters.length > 0 && (
            <Button
              variant="ghost"
              className="inline-flex items-center gap-2"
              onClick={() => {
                table.resetColumnFilters();
                setSelectedProject(undefined); // Reset selected project

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
