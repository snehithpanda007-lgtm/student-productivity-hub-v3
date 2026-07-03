import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import NotesManager from "./NotesManager";

export default async function NotesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: notes, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  return <NotesManager initialNotes={notes ?? []} />;
}