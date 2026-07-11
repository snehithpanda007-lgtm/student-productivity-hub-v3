import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import StatCard from "./components/StatCard";
import ProgressCard from "./components/ProgressCard";
import RecentActivity from "./components/RecentActivity";

import { Task, Note, Activity } from "./types";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [tasksResult, notesResult] = await Promise.all([
    supabase
      .from("tasks")
      .select("id,title,completed,created_at")
      .order("created_at", { ascending: false }),

    supabase
      .from("notes")
      .select("id,title,content,created_at")
      .order("created_at", { ascending: false }),
  ]);

  const tasks: Task[] = tasksResult.data ?? [];
  const notes: Note[] = notesResult.data ?? [];

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  const totalTasks = tasks.length;
  const totalNotes = notes.length;

  const productivity =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const recentActivity: Activity[] = [
    ...tasks.map((task) => ({
      id: task.id,
      text: task.completed
        ? `✅ Completed "${task.title}"`
        : `📌 Created task "${task.title}"`,
      createdAt: task.created_at,
    })),
    ...notes.map((note) => ({
      id: note.id,
      text: `📝 Created note "${note.title}"`,
      createdAt: note.created_at,
    })),
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return (
    <main className="min-h-screen text-white px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Dashboard
          </h1>

          <p className="mt-4 text-lg text-gray-300 leading-relaxed">
            Welcome back,{" "}
            <span className="font-semibold text-white">
              {user.email}
            </span>
            . Here's an overview of your productivity.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
            <StatCard
              title="Completed Tasks"
              value={completedTasks}
              color="text-green-500"
            />
          </div>

          <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
            <StatCard
              title="Pending Tasks"
              value={pendingTasks}
              color="text-yellow-500"
            />
          </div>

          <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
            <StatCard
              title="Notes Created"
              value={totalNotes}
              color="text-blue-500"
            />
          </div>

          <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
            <StatCard
              title="Productivity"
              value={`${productivity}%`}
              color="text-purple-500"
            />
          </div>
        </div>

        {/* Progress */}
        <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
          <ProgressCard
            completedTasks={completedTasks}
            totalTasks={totalTasks}
            productivity={productivity}
          />
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
          <RecentActivity activities={recentActivity} />
        </div>
      </div>
    </main>
  );
}