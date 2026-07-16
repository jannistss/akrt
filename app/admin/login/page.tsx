"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("E-Mail oder Passwort falsch.");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#0a0f14" }}
    >
      <div className="w-full max-w-sm px-6">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image
            src="/assets/images/Logo.png"
            alt="Autoklinik Reutlingen"
            width={160}
            height={40}
            className="h-10 w-auto"
          />
        </div>

        <div
          className="rounded-2xl p-8"
          style={{
            backgroundColor: "#0d1117",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <h1 className="text-xl font-bold text-white mb-1">Admin-Login</h1>
          <p className="text-sm mb-7" style={{ color: "rgba(255,255,255,0.4)" }}>
            Nur fur autorisierte Mitarbeiter
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                E-Mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0074a2")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                Passwort
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-colors"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0074a2")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-400/10 rounded-lg px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg py-2.5 text-sm font-semibold text-white transition-opacity mt-2"
              style={{ backgroundColor: "#0074a2", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Anmelden..." : "Anmelden"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "rgba(255,255,255,0.2)" }}>
          Autoklinik Reutlingen &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
