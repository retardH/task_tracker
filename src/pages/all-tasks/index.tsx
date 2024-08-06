import AllTasksTable from "./components/all-tasks-table";

const AllTasksPage = () => {
  return (
    <div>
      <div className="p-8 space-y-2">
        <div className="flex w-full items-center justify-between">
          <h4 className="mb-4 text-2xl text-primary font-semibold">
            All Tasks
          </h4>
        </div>

        <AllTasksTable />
      </div>
    </div>
  );
};

export default AllTasksPage;
