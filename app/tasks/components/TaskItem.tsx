"use client";

import { Task } from "../types";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function TaskItem({
  task,
  onDelete,
  onToggle,
}: Props) {
  return (
    <div className="mb-3 flex items-center justify-between rounded-lg border border-gray-700 bg-gray-700 px-4 py-3">
      <button
        onClick={() => onToggle(task.id)}
        className={`flex-1 text-left transition-colors cursor-pointer ${
          task.completed
            ? "text-gray-400 line-through"
            : "text-white hover:text-gray-300"
        }`}
      >
        {task.title}
      </button>

      <button
        onClick={() => onDelete(task.id)}
        className="ml-4 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700 cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
}