"use client";

import { Task } from "../types"

interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

export default function TaskItem({
  task,
  onDelete,
  onToggle,
}: Props) {
  return (
    <div className="flex justify-between items-center p-3 rounded mb-2 bg-gray-900">

      <span
        onClick={() => onToggle(task.id)}
        className={`cursor-pointer hover:text-gray-400 ${
          task.completed
            ? "line-through text-gray-500"
            : ""
        }`}
      >
        {task.title}
      </span>

      <button
        onClick={() => onDelete(task.id)}
        className="text-red-600 cursor-pointer hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
}