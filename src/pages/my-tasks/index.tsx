import { ComboboxDemo } from "@/components/shared/combo-box";
import TasksTable from "./components/tasks-table";

const MainPage = () => {
  return (
    <div>
      <div className="p-8 space-y-2">
        <ComboboxDemo />
        <h4 className="mb-6">My Tasks</h4>
        <TasksTable />
      </div>
    </div>
  );
};

export default MainPage;
