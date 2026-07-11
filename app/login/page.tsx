"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-10 text-white">
      <div className="w-full max-w-md rounded-xl border border-gray-700 bg-gray-800 p-8">
        <h1 className="text-4xl font-bold">
          Login
        </h1>

        <p className="mt-2 text-gray-400">
          Sign in to access your notes.
        </p>

        <div className="mt-8">
          <label className="text-sm text-gray-400">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-lg bg-gray-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mt-5">
          <label className="text-sm text-gray-400">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            className="mt-2 w-full rounded-lg bg-gray-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-green-600 px-5 py-3 font-semibold hover:bg-green-700 disabled:bg-gray-600 cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-green-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}