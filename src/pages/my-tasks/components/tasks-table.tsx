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
import {
  MixerVerticalIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { statusWithIconMapping } from "@/constants";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import PersonalTaskForm from "@/components/form/task-form";
import DatePicker from "@/components/ui/date-picker";
import { Separator } from "@/components/ui/separator";
import { getAuthInfo } from "@/lib/utils";
import {
  useDeleteTaskById,
  useGetSingleTaskById,
  useGetTasksByStaffId,
} from "@/services/task";
import { useQueryClient } from "@tanstack/react-query";

const TasksTable = () => {
  const queryClient = useQueryClient();

  const columns: ColumnDef<ITask>[] = [
    // {
    //   accessorKey: "staffId",
    //   header: () => {
    //     return <div>Staff Id</div>;
    //   },
    //   cell: ({ row }) => {
    //     return (
    //       <div className="font-medium min-w-[100px]">
    //         {row.original.staffId}
    //       </div>
    //     );
    //   },
    // },
    // {
    //   accessorKey: "staffName",
    //   header: "Staff Name",
    //   cell: ({ row }) => {
    //     return <div className="min-w-[120px]">{row.original.staffName}</div>;
    //   },
    // },
    {
      accessorKey: "date",
      header: "Date",
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
    },
    // {
    //   accessorKey: "fromTime",
    //   header: "From",
    //   cell: ({ row }) => {
    //     return <div className="min-w-[80px]">{row.original.fromTime}</div>;
    //   },
    // },
    // {
    //   accessorKey: "toTime",
    //   header: "To",
    //   cell: ({ row }) => {
    //     return <div className="min-w-[80px]">{row.original.toTime}</div>;
    //   },
    // },
    {
      id: "duration",
      header: "Duration",
      cell: ({ row }) => {
        return (
          <div className="min-w-[120px]">
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
    },
    {
      accessorKey: "task",
      header: "Task",
      cell: ({ row }) => {
        return (
          <div className="min-w-[110px]">{row.original.mainTask.name}</div>
        );
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
          <div className="flex min-w-[150px] items-center justify-start gap-2">
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
          <div className="min-w-[240px] text-left">{row.original.remark}</div>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        return (
          <div key={row.id} className="flex min-w-[80px] justify-end gap-2">
            <Button
              size={"icon"}
              variant={"outline"}
              onClick={() => {
                setSelectedTaskId(row.original.id);
                editDialogTriggerRef.current?.click();
              }}
            >
              <Pencil1Icon />
            </Button>
            <Button
              size={"icon"}
              variant={"destructive"}
              onClick={() => {
                deletePersonalTask.mutate(row.original.id, {
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                      queryKey: ["tasks", userInfo?.accountId],
                      exact: true,
                    });
                  },
                });
              }}
            >
              <TrashIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  const editDialogTriggerRef = useRef<HTMLButtonElement>(null);
  const { userInfo } = getAuthInfo();
  const { data: personalTasksResp } = useGetTasksByStaffId(userInfo?.accountId);
  const personalTasks = personalTasksResp?.data ?? [];

  const deletePersonalTask = useDeleteTaskById();

  const [selectedTaskId, setSelectedTaskId] = useState<string>("");

  const { data: singleTaskResp } = useGetSingleTaskById(selectedTaskId);
  const singleTaskDetail = singleTaskResp?.data;

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [visibilityState, setVisibilityState] = useState<VisibilityState>({});

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: personalTasks,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setVisibilityState,
    onColumnFiltersChange: setColumnFilters,
    state: {
      pagination: pagination,
      columnVisibility: visibilityState,
      columnFilters: columnFilters,
    },
  });

  // useEffect(() => {
  //   if (singleTaskDetail) {
  //     editDialogTriggerRef.current?.click();
  //   }
  // }, [singleTaskDetail, selectedTaskId]);

  return (
    <>
      <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <DatePicker
            className="w-full md:w-[240px]"
            placeholder="Filter by date..."
            date={
              table.getColumn("date")?.getFilterValue()
                ? new Date(table.getColumn("date")?.getFilterValue() as string)
                : undefined
            }
            onDateChange={(date) => {
              table.getColumn("date")?.setFilterValue(date);
            }}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-between gap-4">
            <Dialog
              key="create"
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger key="create" asChild>
                <Button>Add New Task</Button>
              </DialogTrigger>
              <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                  <DialogTitle className="text-left">
                    Create New Task Record
                  </DialogTitle>
                </DialogHeader>
                <Separator />
                <PersonalTaskForm setIsOpenDialog={setIsCreateDialogOpen} />
              </DialogContent>
            </Dialog>
          </div>
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
      <DataTable table={table} columns={columns} loading />
      <Dialog
        key="edit"
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      >
        <DialogTrigger
          key="edit"
          ref={editDialogTriggerRef}
          asChild
          className="h-0 w-0"
        >
          <Button className="h-0 w-0 p-0"></Button>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Update Task Record</DialogTitle>
          </DialogHeader>
          <Separator />
          <PersonalTaskForm
            isEditMode
            setIsOpenDialog={setIsEditDialogOpen}
            defaultData={singleTaskDetail}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TasksTable;
