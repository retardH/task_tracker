import TasksTable from "./components/tasks-table";

const MainPage = () => {
  return (
    <div>
      <div className="p-4 md:p-8">
        <div className="mb-4 flex w-full items-center justify-between">
          <h4 className="text-lg font-semibold text-primary md:text-2xl">
            My Tasks
          </h4>
        </div>
        <TasksTable />
      </div>
    </div>
  );
};

export default MainPage;
