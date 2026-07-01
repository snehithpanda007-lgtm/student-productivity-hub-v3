"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

import { Task } from "./types";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("all");

  const supabase = useMemo(() => createClient(), []);

  async function loadTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading tasks:", error);
      return;
    }

    setTasks(data);
  }

  useEffect(() => {
    loadTasks();
  }, [supabase]);

  async function addTask(title: string) {
    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          title,
          completed: false,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error adding task:", error);
      return;
    }

    setTasks((prev) => [data, ...prev]);

    // Alternatively:
    // await loadTasks();
  }

  async function deleteTask(id: string) {
    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting task:", error);
      return;
    }

    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );

    // Alternatively:
    // await loadTasks();
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
      console.error("Error updating task:", error);
      return;
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );

    // Alternatively:
    // await loadTasks();
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