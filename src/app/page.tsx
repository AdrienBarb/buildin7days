"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  subscribeSchema,
  type SubscribeFormData,
} from "@/lib/schemas/subscribe";
import useApi from "@/lib/hooks/useApi";
import toast from "react-hot-toast";

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
            A FREE WEEKLY NEWSLETTER SHARING SIMPLE STARTUP IDEAS YOU CAN LAUNCH
            SOLO IN JUST ONE WEEK.
          </h2>

          <p className="max-w-2xl text-center text-base leading-relaxed text-foreground text-montserrat font-extralight">
            Receive new startup ideas every Tuesday morning, plus a detailed
            report showing exactly how to build each one in 7 days
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
      </main>
    </div>
  );
}
