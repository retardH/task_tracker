import DataTable from "@/components/ui/data-table";
import { ITask } from "@/models";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const tasks: ITask[] = [
  {
    staffId: "00002",
    staffName: "Htet Zarni",
    fromTime: "9:00 AM",
    toTime: "12:00 AM",
    status: "In Progress",
    remark:
      "Lorem ipsum dolor sit amet consectetur adipisinsequuntur ea voluptatem rerum ad. ",
  },
  {
    staffId: "00002",
    staffName: "Htet Zarni",
    fromTime: "9:00 AM",
    toTime: "12:00 AM",
    status: "In Progress",
    remark:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. repellendus reiciendis consequuntur ea voluptatem rerum ad. ",
  },
  {
    staffId: "00002",
    staffName: "Htet Zarni",
    fromTime: "9:00 AM",
    toTime: "12:00 AM",
    status: "In Progress",
    remark:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Insequuntur ea voluptatem rerum ad. ",
  },
  {
    staffId: "00002",
    staffName: "Htet Zarni",
    fromTime: "9:00 AM",
    toTime: "12:00 AM",
    status: "In Progress",
    remark:
      "Lorem ipsum dolor sit amet consectetur reiciendis consequuntur ea voluptatem rerum ad. ",
  },
];

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
        return <div className="min-w-[120px]">{row.original.status}</div>;
      },
    },
    {
      accessorKey: "remark",
      header: "Remark",
      cell: ({ row }) => {
        return <div className="min-w-[300px]">{row.original.remark}</div>;
      },
    },
  ];

  const table = useReactTable({
    data: tasks,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable table={table} columns={columns} />;
};

export default TasksTable;
