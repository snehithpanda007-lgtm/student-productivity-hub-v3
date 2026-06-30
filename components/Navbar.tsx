import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="bg-blue-900 shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">
        Student Productivity Hub
      </h1>

      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-white text-sm">
              {user.email}
            </span>

            <LogoutButton />
          </>
        )}
      </div>
    </header>
  );
}