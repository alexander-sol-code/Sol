import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  if (!sessionId) return Response.json({ error: "No sessionId" }, { status: 400 });

  const [{ data: memories }, { data: emotions }, { data: state }, { data: conversations }] = await Promise.all([
    supabase.from("sol_memories").select("*").eq("session_id", sessionId).order("created_at", { ascending: false }).limit(50),
    supabase.from("sol_emotions").select("emotion_id").eq("session_id", sessionId),
    supabase.from("sol_state").select("*").eq("session_id", sessionId).single(),
    supabase.from("sol_conversations").select("*").eq("session_id", sessionId).order("created_at", { ascending: true }).limit(30),
  ]);

  const count = state?.conversation_count || 0;
  const capacity = 20 + Math.floor(count / 5) * 5;

  return Response.json({
    memories: memories || [],
    learnedEmotions: (emotions || []).map((e) => e.emotion_id),
    state: { ...state, capacity },
    conversations: conversations || [],
  });
}
