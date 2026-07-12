"use client";

import { useMemo, useState } from "react";
import { Task } from "../types";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function TaskList({
  tasks,
  onDelete,
  onToggle,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return tasks;

    return tasks.filter((task) => {
      const title = task.title?.toLowerCase() ?? "";

      return title.includes(query);
    });
  }, [tasks, search]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg bg-gray-700 px-4 py-3 text-white outline-none transition focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 ? (
        <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
          <p className="text-gray-400">
            {search
              ? "No matching tasks found."
              : "No tasks available."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}