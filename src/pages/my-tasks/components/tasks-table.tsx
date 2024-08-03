import DataTable from "@/components/ui/data-table";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Task = {
  staffId: string;
  staffName: string;
  from: string;
  to: string;
  status: string;
  remark: string;
};

const tasks: Task[] = [
  {
    staffId: "00002",
    staffName: "Htet Zarni",
    from: "9:00 AM",
    to: "12:00 AM",
    status: "In Progress",
    remark:
      "Lorem ipsum dolor sit amet consectetur adipisinsequuntur ea voluptatem rerum ad. ",
  },
  {
    staffId: "00002",
    staffName: "Htet Zarni",
    from: "9:00 AM",
    to: "12:00 AM",
    status: "In Progress",
    remark:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. repellendus reiciendis consequuntur ea voluptatem rerum ad. ",
  },
  {
    staffId: "00002",
    staffName: "Htet Zarni",
    from: "9:00 AM",
    to: "12:00 AM",
    status: "In Progress",
    remark:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Insequuntur ea voluptatem rerum ad. ",
  },
  {
    staffId: "00002",
    staffName: "Htet Zarni",
    from: "9:00 AM",
    to: "12:00 AM",
    status: "In Progress",
    remark:
      "Lorem ipsum dolor sit amet consectetur reiciendis consequuntur ea voluptatem rerum ad. ",
  },
];

const TasksTable = () => {
  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "staffId",
      header: "Staff Id",
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
      accessorKey: "from",
      header: "From Time",
      cell: ({ row }) => {
        return <div className="min-w-[120px]">{row.original.from}</div>;
      },
    },
    {
      accessorKey: "to",
      header: "To Time",
      cell: ({ row }) => {
        return <div className="min-w-[120px]">{row.original.to}</div>;
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
