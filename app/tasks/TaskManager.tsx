"use client";

import { useMemo, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import { Task } from "./types";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";

interface TaskManagerProps {
  initialTasks: Task[];
}

export default function TaskManager({
  initialTasks,
}: TaskManagerProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("all");

  const supabase = useMemo(() => createClient(), []);

  async function addTask(title: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          title,
          completed: false,
          user_id: user.id,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setTasks((prev) => [data, ...prev]);
  }

  async function deleteTask(id: string) {
    if (!confirm("Delete this task?")) return;

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  }

  async function toggleTask(id: string) {
    const task = tasks.find((t) => t.id === id);

    if (!task) return;

    const { error } = await supabase
      .from("tasks")
      .update({
        completed: !task.completed,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <main className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">
        Task Manager
      </h1>

      <TaskForm onAdd={addTask} />

      <FilterBar
        filter={filter}
        setFilter={setFilter}
      />

      {filteredTasks.length === 0 ? (
        <p className="text-gray-500 mt-6">
          No tasks found.
        </p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onToggle={toggleTask}
        />
      )}
    </main>
  );
}