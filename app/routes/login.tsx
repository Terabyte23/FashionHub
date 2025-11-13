import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_BASE = "http://localhost/web-market/server";

export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await fetch(`${API_BASE}/login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      

      const text = await res.text();
      console.log("login raw response:", text);

      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        setError("Сервер вернул не JSON, смотри консоль");
        console.error("login.php not JSON:", text);
        return;
      }

      if (data.success && data.user) {
        // data.user приходит из PHP (id, name, email, avatar, role)
        login(data.user);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("login error", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-65px)] grid place-items-center px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur rounded-xl border border-black/10 p-6 sm:p-8">
        <h1 className="text-3xl font-semibold text-center">Sign in</h1>
        <p className="text-center text-sm text-black/60 mt-1">
          Welcome back! Please enter your details
        </p>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-black/20" />
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full h-11 px-3 rounded-md border border-black/15 outline-none focus:ring-2 ring-black/20 bg-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-full h-11 px-3 rounded-md border border-black/15 outline-none focus:ring-2 ring-black/20 bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-md bg-black text-white hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="underline underline-offset-4 hover:opacity-80">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
