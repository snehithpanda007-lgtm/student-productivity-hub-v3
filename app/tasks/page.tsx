import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import TaskManager from "./TaskManager";

export default async function TasksPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  return <TaskManager initialTasks={tasks ?? []} />;
}