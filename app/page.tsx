import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen text-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Student Productivity Hub
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed">
          Stay organized with a single platform to manage your{" "}
          <span className="font-semibold text-white">tasks</span>,{" "}
          <span className="font-semibold text-white">notes</span>, and{" "}
          <span className="font-semibold text-white">productivity</span>.
        </p>

        {user ? (
          <div className="mt-10">
            <p className="mb-4 text-gray-400">
              Welcome back, <span className="text-white">{user.email}</span>
            </p>

            <Link
              href="/dashboard"
              className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-200"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 transition hover:bg-gray-200"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="rounded-lg border border-gray-600 px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
            >
              Login
            </Link>
          </div>
        )}

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
            <h2 className="text-xl font-semibold">✅ Tasks</h2>
            <p className="mt-2 text-gray-400">
              Organize, update, and track your daily tasks with ease.
            </p>
          </div>

          <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
            <h2 className="text-xl font-semibold">📝 Notes</h2>
            <p className="mt-2 text-gray-400">
              Save important ideas and access them securely anytime.
            </p>
          </div>

          <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
            <h2 className="text-xl font-semibold">📊 Dashboard</h2>
            <p className="mt-2 text-gray-400">
              View your productivity statistics and recent activity in one place.
            </p>
          </div>
        </div>

        <footer className="mt-16 text-sm text-gray-500">
          Built with Next.js • TypeScript • Tailwind CSS • Supabase
        </footer>
      </div>
    </main>
  );
}