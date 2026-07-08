import Link from "next/link";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10 text-white">
      <div className="grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
        <section className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">
            Start here
          </p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Create your account and begin collecting ideas.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            This page is fully under your control, so you can style it however you
            want while still using Clerk for auth logic.
          </p>
          <Link
            href="/sign-in"
            className="mt-8 inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Already have an account?
          </Link>
        </section>

        <div className="rounded-4xl bg-white p-3 shadow-2xl shadow-black/30">
          <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" forceRedirectUrl="/dashboard"/>
        </div>
      </div>
    </main>
  )
}