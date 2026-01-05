import { AddTaskFormEvent, AddTaskFormProps, NewTask } from "@/types/task";
import { useState } from "react";

const AddTaskForm = ({ onClose, load, task }: AddTaskFormProps) => {
  const [loading, setLoading] = useState(false);
  const isEdit = !!task;

  const handleSubmit = async (e: AddTaskFormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const newTask: NewTask = {
      title: formData.get("title"),
      description: formData.get("description"),
      dueDate: formData.get("dueDate"),
    };

    try {
      await fetch(isEdit ? `/api/tasks/${task.id}` : "/api/tasks", {
        method: isEdit ? "PATCH" : "POST",
        body: JSON.stringify(newTask),
        headers: { "Content-Type": "application/json" },
      });

      onClose(); // close form
      load();
    } catch (err) {
      console.error("AddTaskForm error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 bg-white shadow-md p-4 rounded-lg border w-full max-w-md flex flex-col gap-3"
    >
      <input
        name="title"
        placeholder="Title"
        required
        className="border px-3 py-2 rounded"
        defaultValue={task?.title ?? ""}
      />

      <textarea
        name="description"
        placeholder="Description"
        className="border px-3 py-2 rounded"
        required
        defaultValue={task?.description ?? ""}
      />

      <input
        type="date"
        name="dueDate"
        className="border px-3 py-2 rounded"
        required
        defaultValue={
          task?.dueDate
            ? new Date(task.dueDate).toISOString().split("T")[0]
            : ""
        }
      />

      <button
        className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading
          ? isEdit
            ? "Saving..."
            : "Creating..."
          : isEdit
          ? "Save"
          : "Create"}
      </button>
    </form>
  );
};
export default AddTaskForm;
