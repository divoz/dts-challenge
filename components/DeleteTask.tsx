"use client";

interface DeleteTaskProps {
  task: { id: number | string; title: string; status: string };
  onDelete: () => void;
}

const DeleteTask = ({ task, onDelete }: DeleteTaskProps) => {
  const handleDelete = async () => {
    return await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
    onDelete();
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:text-red-800 text-sm"
    >
      Delete
    </button>
  );
};

export default DeleteTask;
