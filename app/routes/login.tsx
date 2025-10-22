import { Link } from "react-router";

export default function Login() {
  return (
    <main className="min-h-[calc(100vh-65px)] grid place-items-center px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur rounded-xl border border-black/10 p-6 sm:p-8">
        <h1 className="text-3xl font-semibold text-center">Sign in</h1>
        <p className="text-center text-sm text-black/60 mt-1">Welcome back! Please enter your details</p>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-black/20" />
        </div>

        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm">Email</label>
            <input type="email" required placeholder="Enter your email" className="w-full h-11 px-3 rounded-md border border-black/15 outline-none focus:ring-2 ring-black/20 bg-white" />
          </div>

          <div className="space-y-1">
            <label className="text-sm">Password</label>
            <input type="password" required placeholder="Enter your password" className="w-full h-11 px-3 rounded-md border border-black/15 outline-none focus:ring-2 ring-black/20 bg-white" />
          </div>

          <button type="submit" className="w-full h-11 rounded-md bg-black text-white hover:opacity-90 transition">
            Sign in
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="underline underline-offset-4 hover:opacity-80">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
