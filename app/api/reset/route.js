import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const { sessionId } = await req.json();
  if (!sessionId) return Response.json({ error: "No sessionId" }, { status: 400 });

  await Promise.all([
    supabase.from("sol_memories").delete().eq("session_id", sessionId),
    supabase.from("sol_emotions").delete().eq("session_id", sessionId),
    supabase.from("sol_state").delete().eq("session_id", sessionId),
    supabase.from("sol_conversations").delete().eq("session_id", sessionId),
  ]);

  return Response.json({ ok: true });
}
