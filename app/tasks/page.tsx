"use client";

import { useState, useEffect } from "react";
import TaskCard from "../../components/TaskCard";
import AddTaskForm from "../../components/TaskForm";
import { Task } from "@/types/task";

const TasksPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await fetch("/api/tasks", { cache: "no-store" });
      const body = await res.json();
      setTasks(body.data || []);
    } catch (err) {
      console.error(err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Tasks</h1>

        <button
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add Task"}
        </button>
      </div>

      {/* LOADING (only when loading === true) */}
      {!showForm && loading && (
        <p className="text-gray-500 animate-pulse">Loading tasks...</p>
      )}

      {/* CONTENT */}
      {!showForm && !loading && (
        <>
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks found.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {tasks.map((task: Task) => (
                <TaskCard key={task.id} task={task} load={load} />
              ))}
            </div>
          )}
        </>
      )}

      {showForm && (
        <AddTaskForm onClose={() => setShowForm(false)} load={load} />
      )}
    </div>
  );
};

export default TasksPage;
