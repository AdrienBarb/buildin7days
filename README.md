# BUILDIN7DAYS

A modern newsletter landing page built with Next.js. A simple, elegant solution for collecting newsletter subscriptions and showcasing blog content.

## 📋 About

BUILDIN7DAYS is a newsletter landing page that delivers daily startup ideas you can launch solo in just one week. Visitors can subscribe to the newsletter and browse blog posts featuring startup ideas with detailed analysis and 7-day roadmaps.

## 🚀 Tech Stack

### Core Framework

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 19** - Latest React features

### Styling & UI

- **Tailwind CSS v4** - Utility-first CSS framework with CSS-first configuration
- **shadcn/ui** - Beautiful, accessible component library
- **Lucide React** - Icon library
- **@tailwindcss/typography** - Typography plugin for blog content

### Content Management

- **Sanity CMS** - Headless CMS for blog posts and content
- **next-sanity** - Sanity integration for Next.js
- **@sanity/image-url** - Image URL builder for Sanity assets

### Newsletter & Email

- **Beehiiv API** - Newsletter subscription management
- **Resend** - Email delivery service (for transactional emails)
- **React Email** - Build beautiful emails with React
- **@react-email/components** - Email component library

### Database & ORM

- **Prisma** - Next-generation ORM
- **PostgreSQL** - Database (via Supabase)
- **Supabase** - Local development database

### Authentication

- **Better-auth** - Modern authentication library
- Email/password authentication
- Session management

### Form Handling & Validation

- **React Hook Form** - Performant form library
- **Zod** - Schema validation
- **@hookform/resolvers** - Zod resolver for React Hook Form

### State Management

- **Zustand** - Lightweight state management
- **TanStack Query (React Query)** - Server state management for API calls

### HTTP Client

- **Axios** - HTTP client with interceptors
- Global error handling
- Automatic error state management

### Analytics

- **PostHog** - Product analytics (client & server-side)

### UI/UX

- **React Hot Toast** - Toast notifications
- **shadcn/ui** - Pre-built accessible components

## 📦 Features

- ✅ Newsletter subscription form with email validation
- ✅ Integration with Beehiiv API for subscriber management
- ✅ Blog posts powered by Sanity CMS
- ✅ Responsive, modern UI with Tailwind CSS v4
- ✅ Type-safe development with TypeScript
- ✅ Global error handling
- ✅ API client with React Query hooks
- ✅ State management with Zustand
- ✅ Analytics with PostHog
- ✅ UI components with shadcn/ui
- ✅ SEO optimized with metadata generation

## 🛠️ Setup

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Docker (for local Supabase)

### Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd buildIn7Days
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

4. Configure your `.env` file (see Environment Variables section)

5. Start Supabase locally

```bash
supabase start
```

6. Run database migrations

```bash
npm run db:migrate
```

7. Generate Prisma Client

```bash
npm run db:generate
```

8. Start the development server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your newsletter landing page.

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54325/postgres"
DIRECT_URL="postgresql://postgres:postgres@127.0.0.1:54325/postgres"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Beehiiv Newsletter API
BEEHIIV_API_URL="https://api.beehiiv.com/v2/publications/{publication_id}/subscriptions"
BEEHIIV_API_KEY="your_beehiiv_api_key_here"

# Resend (for transactional emails)
RESEND_API_KEY="your_resend_api_key_here"

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY="your_posthog_key_here"
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID="your_sanity_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"

# App Environment
NEXT_PUBLIC_APP_ENV="development"
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Better-auth endpoints
│   │   ├── subscribe/     # Newsletter subscription endpoint
│   │   └── webhooks/      # Webhook handlers
│   ├── posts/             # Blog posts pages
│   │   ├── [slug]/        # Individual post page
│   │   └── page.tsx       # Posts listing page
│   ├── globals.css        # Global styles + Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page with subscription form
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── providers/        # Context providers
│   ├── reassurance/      # Reassurance component
│   ├── navbar/           # Navigation component
│   └── tracking/         # Analytics components
├── lib/                  # Library code
│   ├── api/             # API client (Axios)
│   ├── better-auth/     # Auth configuration
│   ├── db/              # Prisma client & schema
│   ├── emails/          # Email templates
│   ├── hooks/           # Custom React hooks (useApi)
│   ├── resend/          # Email client
│   ├── sanity/          # Sanity CMS client
│   ├── schemas/         # Zod schemas (subscribe validation)
│   ├── stores/          # Zustand stores
│   ├── tracking/        # PostHog client
│   └── utils.ts         # Utility functions
└── utils/               # Utility functions
    └── errors/          # Error handling utilities
```

## 🎯 Usage Examples

### Newsletter Subscription

The subscription form is handled on the landing page (`src/app/page.tsx`):

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscribeSchema } from "@/lib/schemas/subscribe";
import useApi from "@/lib/hooks/useApi";

const { usePost } = useApi();
const { mutate: subscribe } = usePost("/subscribe", {
  onSuccess: () => {
    toast.success("Successfully subscribed to newsletter!");
  },
});
```

### Fetching Blog Posts from Sanity

```typescript
import { client } from "@/lib/sanity/client";

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc)`;

const posts = await client.fetch(POSTS_QUERY);
```

### API Requests with React Query

```typescript
import useApi from "@/lib/hooks/useApi";

function MyComponent() {
  const { useGet, usePost } = useApi();

  // GET request
  const { data, isLoading, error } = useGet("/api/endpoint");

  // POST request
  const createItem = usePost("/api/endpoint", {
    onSuccess: () => {
      console.log("Success!");
    },
  });

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
```

### State Management with Zustand

```typescript
import { useErrorStore } from "@/lib/stores/errorStore";

function MyComponent() {
  const { isError, statusCode, errorMessage, setError, clearError } =
    useErrorStore();

  if (isError) {
    console.log(`Error ${statusCode}: ${errorMessage}`);
  }
}
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run db:generate` - Generate Prisma Client
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio
- `npm run email:dev` - Start React Email dev server

## 🗄️ Database

### Prisma Schema Location

- Schema: `src/lib/db/schema.prisma`
- Migrations: `src/lib/db/migrations/`

### Supabase Local Development

Start Supabase:

```bash
supabase start
```

Stop Supabase:

```bash
supabase stop
```

Access Supabase Studio:

```
http://127.0.0.1:54328
```

## 🎨 Adding shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

Examples:

- `npx shadcn@latest add card`
- `npx shadcn@latest add input`
- `npx shadcn@latest add dialog`
- `npx shadcn@latest add form`

## 🔧 Configuration Files

- `components.json` - shadcn/ui configuration
- `postcss.config.mjs` - PostCSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration
- `supabase/config.toml` - Supabase local configuration
- `next.config.ts` - Next.js configuration

## 📚 Key Libraries Documentation

- [Next.js](https://nextjs.org/docs)
- [Sanity CMS](https://www.sanity.io/docs)
- [Beehiiv API](https://www.beehiiv.com/developers)
- [Prisma](https://www.prisma.io/docs)
- [Better-auth](https://www.better-auth.com/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://docs.pmnd.rs/zustand)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [React Email](https://react.email)
- [PostHog](https://posthog.com/docs)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)

## 🚀 Deployment

### Environment Variables for Production

Make sure to set all environment variables in your hosting platform:

- Vercel: Project Settings → Environment Variables
- Railway: Variables tab
- Other platforms: Check their documentation

### Database

For production, use Supabase Cloud or your own PostgreSQL instance. Update `DATABASE_URL` and `DIRECT_URL` in your production environment.

### Sanity CMS

Ensure your Sanity project ID and dataset are configured in production environment variables.

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
