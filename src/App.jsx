import React, { useState, useEffect, useRef } from "react";

/**
 * DeepFusion — Minimal React Chat UI (demo)
 * This is a lightweight starting UI. Later we'll connect /api/ai.
 */

export default function App() {
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", text: "স্বাগতম DeepFusion — প্রশ্ন করো, আমি সাহায্য করবো।" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages, loading]);

  async function handleSend() {
    if (!input.trim()) return;
    const user = { id: Date.now(), role: "user", text: input };
    setMessages((m) => [...m, user]);
    setInput("");
    setLoading(true);

    // Temporary simulated AI response (replace later with /api/ai POST)
    await new Promise((r) => setTimeout(r, 900));
    setMessages((m) => [
      ...m,
      { id: Date.now() + 1, role: "assistant", text: `DeepFusion (demo): উত্তর — "${user.text}"` },
    ]);
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#071029", color: "#e6eef8", padding: 16, fontFamily: "system-ui" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(90deg,#6366f1,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3v18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><path d="M3 12h18" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>DeepFusion</div>
            <div style={{ fontSize: 12, color: "#9fb4dd" }}>Near-ChatGPT — demo</div>
          </div>
        </div>
        <div>
          <button style={{ background: "#0ea5a9", border: "none", padding: "8px 12px", borderRadius: 8, color: "#062024", fontWeight: 600 }}>Upgrade</button>
        </div>
      </header>

      <main style={{ display: "flex", gap: 12 }}>
        <section style={{ flex: 1, background: "#071b2b", borderRadius: 12, padding: 12 }}>
          <div ref={ref} style={{ maxHeight: "60vh", overflow: "auto", paddingRight: 8 }}>
            {messages.map((m) => (
              <div key={m.id} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 8 }}>
                <div style={{
                  background: m.role === "user" ? "linear-gradient(90deg,#6366f1,#06b6d4)" : "#083047",
                  padding: "10px 12px",
                  borderRadius: 12,
                  maxWidth: "78%",
                  color: m.role === "user" ? "#042028" : "#cfe8ff",
                  whiteSpace: "pre-wrap"
                }}>
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 8 }}>
                <div style={{ background: "#083047", padding: "8px 10px", borderRadius: 10 }}>DeepFusion is thinking...</div>
              </div>
            )}
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                placeholder="প্রশ্ন here..."
                style={{ flex: 1, padding: "10px 12px", borderRadius: 10, border: "1px solid #164e63", background: "#021827", color: "#e6eef8" }}
              />
              <button onClick={handleSend} style={{ background: "#06b6d4", border: "none", padding: "10px 14px", borderRadius: 10, fontWeight: 600 }}>Send</button>
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: "#9fb4dd" }}>Tip: This is a demo UI. Later we'll connect a free AI API (Groq / HuggingFace).</div>
          </div>
        </section>

        <aside style={{ width: 220, background: "#061827", borderRadius: 12, padding: 10 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>History</div>
          <div style={{ fontSize: 13, color: "#9fb4dd" }}>
            {messages.filter(m => m.role === "user").slice(-6).reverse().map(m => (
              <div key={m.id} style={{ padding: 8, borderRadius: 8, background: "#022634", marginBottom: 8 }}>{m.text.slice(0, 40)}...</div>
            ))}
            {messages.filter(m => m.role === "user").length === 0 && <div style={{ color: "#6b7280" }}>No history yet</div>}
          </div>
        </aside>
      </main>
    </div>
  );
}
