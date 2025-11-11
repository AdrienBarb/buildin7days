import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/lib/sanity/client";
import { Button } from "@/components/ui/button";

// Icon components
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

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  ...,
  report,
  boilerplate,
  bundle
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    await params,
    options
  );
  const postImageUrl = post.image
    ? urlFor(post.image)?.width(1200).height(675).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen p-8 flex flex-col gap-4">
      {/* Article Content - Narrow Width */}
      <div className="max-w-3xl mx-auto w-full flex flex-col gap-4">
        {postImageUrl && (
          <img
            src={postImageUrl}
            alt={post.title}
            className="w-full aspect-video rounded-xl object-cover"
            width="1200"
            height="675"
          />
        )}
        <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
        <div className="prose prose-invert max-w-none">
          {Array.isArray(post.body) && (
            <div className="prose-content">
              <PortableText
                value={post.body}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="mb-4 leading-relaxed">{children}</p>
                    ),
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold mb-4 mt-8">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold mb-3 mt-6">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold mb-2 mt-4">
                        {children}
                      </h3>
                    ),
                  },
                  marks: {
                    strong: ({ children }) => (
                      <strong className="font-bold">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),
                    link: ({ children, value }) => (
                      <a
                        href={value?.href}
                        className="text-primary hover:underline"
                        target={value?.blank ? "_blank" : undefined}
                        rel={value?.blank ? "noopener noreferrer" : undefined}
                      >
                        {children}
                      </a>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="list-disc list-inside mb-4 space-y-2">
                        {children}
                      </ul>
                    ),
                    number: ({ children }) => (
                      <ol className="list-decimal list-inside mb-4 space-y-2">
                        {children}
                      </ol>
                    ),
                  },
                  listItem: {
                    bullet: ({ children }) => (
                      <li className="ml-4">{children}</li>
                    ),
                    number: ({ children }) => (
                      <li className="ml-4">{children}</li>
                    ),
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>

      {post.boilerplate && (
        <div
          id="pricing"
          className="max-w-6xl mx-auto w-full mt-16 scroll-mt-16"
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
                  After purchase, you’ll receive an email invitation to access
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
      )}
    </main>
  );
}
