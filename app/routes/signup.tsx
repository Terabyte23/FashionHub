import { Link } from "react-router";
import { useState } from "react";

export default function SignUp() {
  const [show, setShow] = useState<{ p1: boolean; p2: boolean }>({ p1: false, p2: false });

  return (
    <main className="min-h-[calc(100vh-65px)] grid place-items-center px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur rounded-xl border border-black/10 p-6 sm:p-8">
        <h1 className="text-3xl font-semibold text-center">Create Your Account</h1>
        <p className="text-center text-sm text-black/60 mt-1">Please enter your details</p>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-black/20" />
        </div>

        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm">Name</label>
            <input type="text" required placeholder="Enter your name" className="w-full h-11 px-3 rounded-md border border-black/15 outline-none focus:ring-2 ring-black/20 bg-white" />
          </div>

          <div className="space-y-1">
            <label className="text-sm">Email</label>
            <input type="email" required placeholder="Enter your email" className="w-full h-11 px-3 rounded-md border border-black/15 outline-none focus:ring-2 ring-black/20 bg-white" />
          </div>

          <div className="space-y-1">
            <label className="text-sm">Password</label>
            <div className="relative">
              <input type={show.p1 ? "text" : "password"} required placeholder="Enter password" className="w-full h-11 px-3 pr-10 rounded-md border border-black/15 outline-none focus:ring-2 ring-black/20 bg-white" />
              <button type="button" onClick={() => setShow((s) => ({ ...s, p1: !s.p1 }))} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded bg-black/5 hover:bg-black/10">
                {show.p1 ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm">Retype Password</label>
            <div className="relative">
              <input type={show.p2 ? "text" : "password"} required placeholder="Retype password" className="w-full h-11 px-3 pr-10 rounded-md border border-black/15 outline-none focus:ring-2 ring-black/20 bg-white" />
              <button type="button" onClick={() => setShow((s) => ({ ...s, p2: !s.p2 }))} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded bg-black/5 hover:bg-black/10">
                {show.p2 ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" required className="size-4 rounded border-black/20" />
            I accepted all terms & conditions.
          </label>

          <button type="submit" className="w-full h-11 rounded-md bg-black text-white hover:opacity-90 transition">
            Sign up
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="underline underline-offset-4 hover:opacity-80">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
