import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-gray-700 bg-gray-900 px-6 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          Student Productivity Hub
        </h1>

        {user && (
          <div className="flex items-center gap-5">
            <span className="text-sm text-gray-400">
              {user.email}
            </span>

            <LogoutButton />
          </div>
        )}
      </div>
    </header>
  );
}