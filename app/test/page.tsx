import { createClient } from "@/lib/supabase/server";

export default async function TestPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("*");

  if (error) {
    return <pre>{error.message}</pre>;
  }

  return (
    <main>
      <h1>Supabase Connected 🎉</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}