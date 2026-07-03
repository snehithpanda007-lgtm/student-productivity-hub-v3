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

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

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
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Welcome back, {user.email}!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Completed Tasks"
          value={completedTasks}
          color="text-green-500"
        />

        <StatCard
          title="Pending Tasks"
          value={pendingTasks}
          color="text-yellow-500"
        />

        <StatCard
          title="Notes Created"
          value={totalNotes}
          color="text-blue-500"
        />

        <StatCard
          title="Productivity"
          value={`${productivity}%`}
          color="text-purple-500"
        />
      </div>

      <ProgressCard
        completedTasks={completedTasks}
        totalTasks={totalTasks}
        productivity={productivity}
      />

      <RecentActivity activities={recentActivity} />
    </div>
  );
}