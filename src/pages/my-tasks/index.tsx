import TasksTable from "./components/tasks-table";

const MainPage = () => {
  return (
    <div>
      <div className="p-8">
        <div className="mb-4 flex w-full items-center justify-between">
          <h4 className="text-2xl font-semibold text-primary">My Tasks</h4>
        </div>
        <TasksTable />
      </div>
    </div>
  );
};

export default MainPage;
