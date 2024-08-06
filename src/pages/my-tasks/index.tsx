import TasksTable from "./components/tasks-table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PersonalTaskForm from "@/components/form/task-form";

const MainPage = () => {
  const navigate = useNavigate();

  const [isopenDialog, setisOpenDialog] = useState(false);

  return (
    <div>
      <div className="p-8 space-y-2">
        <div className=" flex w-full items-start justify-between">
          <h4 className="mb-6 text-xl text-primary font-semibold">My Tasks</h4>
          <div className="flex gap-4 items-center justify-between ">
            <Dialog open={isopenDialog} onOpenChange={setisOpenDialog}>
              <DialogTrigger asChild>
                <Button>Create</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Task Record</DialogTitle>
                </DialogHeader>
                <PersonalTaskForm />
              </DialogContent>
            </Dialog>
            <Button onClick={() => navigate("/all-tasks")}>All Tasks</Button>
          </div>
        </div>

        <TasksTable />
      </div>
    </div>
  );
};

export default MainPage;
