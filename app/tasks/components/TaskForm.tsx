"use client";

import { useState } from "react";

interface Props {
  onAdd: (title: string) => void;
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    onAdd(title.trim());
    setTitle("");
  };

  return (
    <div className="mb-6 flex gap-3">
      <input
        type="text"
        placeholder="Enter a new task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
        className="flex-1 rounded-lg bg-gray-700 px-4 py-3 text-white outline-none transition focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSubmit}
        className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 cursor-pointer"
      >
        Add Task
      </button>
    </div>
  );
}