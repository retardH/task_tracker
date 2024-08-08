import AllTasksTable from "./components/all-tasks-table";

const AllTasksPage = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="flex w-full items-center justify-between">
        <h4 className="mb-4 text-lg font-semibold text-primary md:text-2xl">
          All Employees Tasks
        </h4>
      </div>
      <AllTasksTable />
    </div>
  );
};

export default AllTasksPage;
