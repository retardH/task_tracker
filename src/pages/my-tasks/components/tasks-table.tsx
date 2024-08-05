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
import { Chip } from "@/components/ui/chip";

const TasksTable = () => {
  const columns: ColumnDef<ITask>[] = [
    {
      accessorKey: "staffId",
      header: () => {
        return <div>Staff Id</div>;
      },
      cell: ({ row }) => {
        return <div className="min-w-[100px]">{row.original.staffId}</div>;
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
        return <div className="min-w-[120px]">{row.original.date}</div>;
      },
    },
    {
      accessorKey: "fromTime",
      header: "From Time",
      cell: ({ row }) => {
        return <div className="min-w-[120px]">{row.original.fromTime}</div>;
      },
    },
    {
      accessorKey: "toTime",
      header: "To Time",
      cell: ({ row }) => {
        return <div className="min-w-[120px]">{row.original.toTime}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <div className="min-w-[120px]">
            <Chip color="success">{row.original.status}</Chip>
          </div>
        );
      },
    },
    {
      accessorKey: "remark",
      header: "Remark",
      cell: ({ row }) => {
        return <div className="min-w-[300px]">{row.original.remark}</div>;
      },
    },
    {
      id: "actions",
      header: "",
      cell: () => {
        return (
          <div className="min-w-[100px] flex">
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

export default TasksTable;
