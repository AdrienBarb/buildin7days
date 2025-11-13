import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function BoilerplatePage() {
  return (
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
          foundation — from authentication to analytics — so you can focus on
          what makes your product unique.
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
              <span className="text-3xl font-bold text-foreground">€79.99</span>
              <span className="text-muted-foreground">EUR</span>
            </div>

            <p className="text-muted-foreground text-sm mt-2">
              A robust Next.js foundation designed for modern SaaS products.
            </p>
          </div>

          <ul className="flex flex-col gap-3 flex-1">
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">
                Authentication with Better-auth (Magic Link)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">
                Payments powered by Lemon Squeezy
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">
                Database using Prisma + PostgreSQL (Supabase)
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">
                Email sending via Resend + React Email
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">
                Integrated waitlist flow
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">
                Analytics with PostHog
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">
                API client with React Query + Zustand
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">
                UI built with shadcn/ui, TypeScript, and Tailwind CSS v4
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-foreground">
                Global error handling included
              </span>
            </li>
          </ul>

          <div className="flex flex-col gap-4 mt-auto">
            <p className="text-xs text-muted-foreground">
              After purchase, you&apos;ll receive an email invitation to access
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
  );
}
