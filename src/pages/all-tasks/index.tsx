import AllTasksTable from "./components/all-tasks-table";

const AllTasksPage = () => {
  return (
    <div className="p-8">
      <div className="flex w-full items-center justify-between">
        <h4 className="mb-4 text-2xl font-semibold text-primary">All Tasks</h4>
      </div>

      <AllTasksTable />
    </div>
  );
};

export default AllTasksPage;
