import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { ITask } from "@/models";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { tasks } from "@/constants";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const AllTasksTable = () => {
  const columns: ColumnDef<ITask>[] = [
    {
      id: "staff",
      header: "Staff",
      cell: ({ row }) => {
        return (
          <div className="flex min-w-[120px] flex-col items-start gap-1">
            <h4 className="font-medium">{row.original.staffName}</h4>
            <span className="text-xs text-accent-foreground">
              {row.original.staffId}
            </span>
          </div>
        );
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
          <div
            className={cn("min-w-[120px] text-center text-sm font-medium", {
              "text-blue-500": status === "In Progress",
              "text-amber-500": status === "Pending",
              "text-green-500": status === "Complete",
            })}
          >
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
    {
      id: "actions",
      header: "",
      cell: () => {
        return (
          <div className="flex min-w-[80px] justify-end">
            <Button size={"icon"} variant={"ghost"}>
              <Pencil1Icon />
            </Button>
            <Button size={"icon"} variant={"ghost"}>
              <TrashIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: tasks,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination: pagination,
    },
  });

  return <DataTable table={table} columns={columns} />;
};

export default AllTasksTable;
