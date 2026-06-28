"use client";

import { useState } from "react";

interface Props {
  onAdd: (title: string) => void;
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    onAdd(title);
    setTitle("");
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        className="bg-gray-900 p-2 rounded flex-1 hover:bg-gray-800"
        placeholder="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 rounded cursor-pointer hover:bg-blue-700"
      >
        Add
      </button>
    </div>
  );
}