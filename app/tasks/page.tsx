"use client";

import { useEffect, useState } from "react";
import { Task } from "./types";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load tasks once
  useEffect(() => {
    const saved = localStorage.getItem("tasks");

    if (saved) {
      setTasks(JSON.parse(saved));
    }

    setIsLoaded(true);
  }, []);

  // Save tasks only after loading is complete
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, isLoaded]);

  function addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
  }

  function deleteTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
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