import { HandleSelectChangeType, TaskCardProps } from "@/types/task";

const TaskCard: React.FC<TaskCardProps> = ({ task, load }) => {
  const created = new Date(task.createdAt).toLocaleDateString();
  const dueDate = new Date(task.dueDate).toLocaleDateString();

  const statusBarColors: Record<string, string> = {
    completed: "bg-green-500",
    pending: "bg-yellow-500",
    working: "bg-blue-500",
    "not-started": "bg-gray-500",
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });

      if (!res.ok) {
        console.error("Delete failed");
        return;
      }

      load();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectChange: HandleSelectChangeType = async (
    key,
    newStatus,
    id
  ) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: newStatus }),
      });

      if (!res.ok) {
        console.error("Failed to update status");
        return;
      }

      load(); // refresh UI
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden border-gray-300 relative">
      <div
        className={`absolute left-0 top-0 h-full w-1 ${
          statusBarColors[task.status]
        }`}
      />

      <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>

          <span
            className={`px-2 py-1 text-xs rounded
              ${
                task.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
          >
            {task.status}
          </span>
        </div>

        {task.description && (
          <div className="bg-gray-50 p-3 rounded-md shadow-inner text-sm text-gray-700 mb-3">
            {task.description}
          </div>
        )}

        <div className="text-xs text-gray-500 mb-4">
          <p>Created: {created}</p>
          <p>Due: {dueDate}</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <select
            value={task.level ?? ""}
            onChange={(e) =>
              handleSelectChange("level", e.target.value, task.id)
            }
            className="text-xs h-7 px-2 border rounded-md bg-white"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <div className="flex items-center gap-2">
            <select
              value={task.status}
              onChange={(e) =>
                handleSelectChange("status", e.target.value, task.id)
              }
              className="text-xs h-7 px-2 border rounded-md bg-white cursor-pointer"
            >
              <option value="not-started">Not started</option>
              <option value="working">Working</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <button className="text-xs h-7 px-3 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200">
              Edit
            </button>

            <button
              onClick={() => handleDelete(task.id)}
              className="text-xs h-7 px-3 rounded-md bg-red-100 text-red-700 hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
