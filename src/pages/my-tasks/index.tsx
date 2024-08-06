import TasksTable from "./components/tasks-table";
import { Button } from "@/components/ui/button";
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
  const [isopenDialog, setisOpenDialog] = useState(false);

  // (async function () {
  //   const key = await importKey("258ASEZSKEY00000");
  //   const { encrypted } = await encryptPassword("Kbzdev@@0", key);
  //   console.log("encrypted psw ", arrayBufferToBase64(encrypted));
  // })();
  return (
    <div>
      <div className="space-y-2 p-8">
        <div className="mb-4 flex w-full items-center justify-between">
          <h4 className="text-2xl font-semibold text-primary">My Tasks</h4>
          <div className="flex items-center justify-between gap-4">
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
          </div>
        </div>
        <TasksTable />
      </div>
    </div>
  );
};

export default MainPage;
