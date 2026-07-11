"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!email.trim() || !password.trim()) {
      alert("Please enter an email and password.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created successfully!");

    router.push("/login");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-10 text-white">
      <div className="w-full max-w-md rounded-xl border border-gray-700 bg-gray-800 p-8">
        <h1 className="text-4xl font-bold">
          Sign Up
        </h1>

        <p className="mt-2 text-gray-400">
          Create an account to start managing your notes.
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
            className="mt-2 w-full rounded-lg bg-gray-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-5">
          <label className="text-sm text-gray-400">
            Password
          </label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSignup();
              }
            }}
            className="mt-2 w-full rounded-lg bg-gray-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700 disabled:bg-gray-600 cursor-pointer"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}