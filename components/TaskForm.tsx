import { useState } from "react";

const AddTaskForm = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState(false);

  interface NewTask {
    title: FormDataEntryValue | null;
    description: FormDataEntryValue | null;
    dueDate: FormDataEntryValue | null;
    status: string;
  }

  interface AddTaskFormEvent extends React.FormEvent<HTMLFormElement> {
    target: HTMLFormElement;
  }

  const handleSubmit = async (e: AddTaskFormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const newTask: NewTask = {
      title: formData.get("title"),
      description: formData.get("description"),
      dueDate: formData.get("dueDate"),
      status: "not-started",
    };

    try {
      await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: { "Content-Type": "application/json" },
      });

      onClose(); // close form
    } catch (err) {
      console.error("❌ AddTaskForm error:", err);
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
      />

      <textarea
        name="description"
        placeholder="Description"
        className="border px-3 py-2 rounded"
        required
      />

      <input
        type="date"
        name="dueDate"
        className="border px-3 py-2 rounded"
        required
      />

      <button
        className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
};
export default AddTaskForm;
