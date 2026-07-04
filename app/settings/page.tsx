"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setEmail(user.email ?? "");
    }

    loadUser();
  }, [router, supabase]);

  async function updatePassword() {
    if (!password) return;

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setPassword("");
    setMessage("Password updated successfully.");
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <main className="min-h-screen text-white px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">Account Settings</h1>

        <p className="mt-2 text-gray-400">
          Manage your account information.
        </p>

        {/* Account */}
        <div className="mt-8 rounded-xl border border-gray-700 bg-gray-800 p-6">
          <h2 className="text-2xl font-semibold">Profile</h2>

          <div className="mt-6">
            <label className="text-sm text-gray-400">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              disabled
              className="mt-2 w-full rounded-lg bg-gray-700 px-4 py-3 text-white"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mt-6 rounded-xl border border-gray-700 bg-gray-800 p-6">
          <h2 className="text-2xl font-semibold">
            Change Password
          </h2>

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-5 w-full rounded-lg bg-gray-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={updatePassword}
            className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700"
          >
            Update Password
          </button>

          {message && (
            <p className="mt-4 text-green-400">{message}</p>
          )}
        </div>

        {/* Logout */}
        <div className="mt-6 rounded-xl border border-gray-700 bg-gray-800 p-6">
          <h2 className="text-2xl font-semibold">
            Logout
          </h2>

          <p className="mt-2 text-gray-400">
            Sign out from your account.
          </p>

          <button
            onClick={logout}
            className="mt-5 rounded-lg bg-red-600 px-5 py-3 font-semibold hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}