"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      const storedTasks = localStorage.getItem("tasks");
      const storedNotes = localStorage.getItem("notes");

      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }

      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    }

    loadDashboard();
  }, [router, supabase]);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const totalTasks = tasks.length;
  const totalNotes = notes.length;

  const productivity =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const recentActivity = useMemo(() => {
    const taskActivity = tasks.map((task) => ({
      id: task.id,
      text: task.completed
        ? `✅ Completed "${task.title}"`
        : `📌 Created task "${task.title}"`,
    }));

    const noteActivity = notes.map((note) => ({
      id: note.id,
      text: `📝 Created note "${note.title}"`,
    }));

    return [...taskActivity, ...noteActivity]
      .sort((a, b) => b.id - a.id)
      .slice(0, 5);
  }, [tasks, notes]);

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Welcome back! Here's your productivity overview.
        </p>
      </div>

      {/* Statistics */}

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

      {/* Progress */}

      <div className="bg-gray-900 rounded-xl p-6 shadow">

        <h2 className="text-xl font-semibold mb-4">
          Productivity Progress
        </h2>

        <div className="w-full bg-gray-700 rounded-full h-4">

          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${productivity}%` }}
          />

        </div>

        <p className="mt-3 text-gray-400">
          {completedTasks} of {totalTasks} tasks completed
        </p>

      </div>

      {/* Recent Activity */}

      <div className="bg-gray-900 rounded-xl p-6 shadow">

        <h2 className="text-xl font-semibold mb-5">
          Recent Activity
        </h2>

        {recentActivity.length === 0 ? (
          <p className="text-gray-400">
            No activity yet.
          </p>
        ) : (
          <ul className="space-y-3">

            {recentActivity.map((activity) => (

              <li
                key={activity.id}
                className="border-b border-gray-700 pb-3"
              >
                {activity.text}
              </li>

            ))}

          </ul>
        )}

      </div>

    </div>
  );
}

type StatCardProps = {
  title: string;
  value: string | number;
  color: string;
};

function StatCard({
  title,
  value,
  color,
}: StatCardProps) {
  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition">

      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <h2 className={`text-4xl font-bold mt-3 ${color}`}>
        {value}
      </h2>

    </div>
  );
}