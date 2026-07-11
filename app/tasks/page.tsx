import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import TaskManager from "./TaskManager";

export default async function TasksPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  return (
    <main className="min-h-screen text-white px-6 py-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <h1 className="text-4xl font-bold">Tasks</h1>

        <p className="mt-2 text-gray-400">
          Organize, manage, and keep track of your daily tasks.
        </p>

        {/* Task Manager */}
        <div className="mt-8 rounded-xl border border-gray-700 bg-gray-800 p-6">
          <TaskManager initialTasks={tasks ?? []} />
        </div>
      </div>
    </main>
  );
}