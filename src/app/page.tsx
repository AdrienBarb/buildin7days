"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  subscribeSchema,
  type SubscribeFormData,
} from "@/lib/schemas/subscribe";
import useApi from "@/lib/hooks/useApi";
import toast from "react-hot-toast";
import { Reassurance } from "@/components/reassurance/Reassurance";
import { Button } from "@/components/ui/button";

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 text-primary shrink-0 mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscribeFormData>({
    resolver: zodResolver(subscribeSchema),
  });

  const { usePost } = useApi();
  const { mutate: subscribe, isPending } = usePost("/subscribe", {
    onSuccess: () => {
      toast.success("Successfully subscribed to newsletter!");
      reset();
    },
  });

  const onSubmit = async (data: SubscribeFormData) => {
    subscribe({ email: data.email });
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center px-4">
        <main className="flex w-full max-w-4xl flex-col items-center gap-8 py-16">
          <h1 className="text-center text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl">
            <span className="text-primary">BUILD</span>
            <span className="text-foreground">IN</span>
            <span className="text-primary">7</span>
            <span className="text-foreground">DAYS</span>
          </h1>

          <div className="flex flex-col items-center gap-4">
            <h2 className="text-center text-xl font-extrabold uppercase leading-tight tracking-wide text-foreground sm:text-2xl md:text-3xl">
              A FREE DAILY NEWSLETTER SHARING SIMPLE STARTUP IDEAS YOU CAN
              LAUNCH SOLO IN JUST ONE WEEK.
            </h2>

            <p className="max-w-2xl text-center text-base leading-relaxed text-foreground text-montserrat font-extralight">
              Receive new startup ideas every morning, plus a detailed report
              showing exactly how to build each one in 7 days
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full max-w-lg flex-col gap-2"
          >
            <div className="flex w-full items-center rounded-full border border-input bg-card">
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                disabled={isPending}
                className="h-12 flex-1 rounded-l-full border-0 bg-transparent px-6 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isPending}
                className="flex h-12 items-center cursor-pointer gap-2 rounded-r-full border-0 bg-transparent px-6 font-bold uppercase text-primary transition-colors hover:opacity-90 disabled:opacity-50"
              >
                {isPending ? "SUBSCRIBING..." : "SUBSCRIBE"}
              </button>
            </div>
            {errors.email && (
              <p className="ml-6 text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </form>
          <Reassurance />
        </main>
      </div>

      {/* Pricing Section */}
      <div
        id="pricing"
        className="container mx-auto max-w-6xl w-full py-16 px-4 scroll-mt-16"
      >
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Build your SaaS with confidence.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The Scale boilerplate gives you a complete, production-ready
            foundation — from authentication to analytics — so you can focus
            on what makes your product unique.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
          <div className="border-2 border-primary bg-card rounded-lg p-6 flex flex-col gap-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase">
                Scale
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-bold text-foreground">
                Complete SaaS Boilerplate
              </h3>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground">
                  €79.99
                </span>
                <span className="text-muted-foreground">EUR</span>
              </div>

              <p className="text-muted-foreground text-sm mt-2">
                A robust Next.js foundation designed for modern SaaS products.
              </p>
            </div>

            <ul className="flex flex-col gap-3 flex-1">
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-sm text-foreground">
                  Authentication with Better-auth (Magic Link)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-sm text-foreground">
                  Payments powered by Lemon Squeezy
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-sm text-foreground">
                  Database using Prisma + PostgreSQL (Supabase)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-sm text-foreground">
                  Email sending via Resend + React Email
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-sm text-foreground">
                  Integrated waitlist flow
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-sm text-foreground">
                  Analytics with PostHog
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-sm text-foreground">
                  API client with React Query + Zustand
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-sm text-foreground">
                  UI built with shadcn/ui, TypeScript, and Tailwind CSS v4
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon />
                <span className="text-sm text-foreground">
                  Global error handling included
                </span>
              </li>
            </ul>

            <div className="flex flex-col gap-4 mt-auto">
              <p className="text-xs text-muted-foreground">
                After purchase, you'll receive an email invitation to access
                the private GitHub repository.
              </p>
              <Button asChild className="w-full" size="lg">
                <a
                  href="https://buildin7days.lemonsqueezy.com/buy/304a7908-972e-4c7f-9376-f900e3e8dabd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Scale
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
