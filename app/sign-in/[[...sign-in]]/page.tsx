import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10 text-white">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
        <section className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">
            Welcome back
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Sign in to continue to your dashboard.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Use your own branded sign-in page instead of Clerk’s hosted screen.
          </p>
          <Link
            href="/sign-up"
            className="mt-8 inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Create an account
          </Link>
        </section>

        <div className="rounded-[2rem] bg-white p-3 shadow-2xl shadow-black/30">
          <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up"  forceRedirectUrl="/dashboard"/>
        </div>
      </div>
    </main>
  )
}