# SaaS Template

A modern, production-ready Next.js SaaS template with authentication, database, email, analytics, and more.

## 🚀 Tech Stack

### Core
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 19** - Latest React features

### Styling
- **Tailwind CSS v4** - Utility-first CSS framework with CSS-first configuration
- **shadcn/ui** - Beautiful, accessible component library
- **Lucide React** - Icon library

### Database & ORM
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Database (via Supabase)
- **Supabase** - Local development database

### Authentication
- **Better-auth** - Modern authentication library
- Email/password authentication ready
- Session management

### State Management
- **Zustand** - Lightweight state management
- **TanStack Query (React Query)** - Server state management

### HTTP Client
- **Axios** - HTTP client with interceptors
- Global error handling
- Automatic error state management

### Email
- **Resend** - Email delivery service
- **React Email** - Build beautiful emails with React
- **Tailwind CSS** - Styled email templates

### Analytics
- **PostHog** - Product analytics (client & server-side)

### UI/UX
- **React Hot Toast** - Toast notifications
- **shadcn/ui** - Pre-built accessible components

## 📦 Features

- ✅ Authentication with Better-auth
- ✅ Database with Prisma + PostgreSQL (Supabase)
- ✅ Email sending with Resend + React Email
- ✅ Global error handling
- ✅ API client with React Query hooks
- ✅ State management with Zustand
- ✅ Analytics with PostHog
- ✅ UI components with shadcn/ui
- ✅ TypeScript throughout
- ✅ Tailwind CSS v4 styling

## 🛠️ Setup

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- Docker (for local Supabase)

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd saas-template
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

# Resend
RESEND_API_KEY="your_resend_api_key_here"

# PostHog
NEXT_PUBLIC_POSTHOG_KEY="your_posthog_key_here"
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"

# App Environment
NEXT_PUBLIC_APP_ENV="development"
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── auth/          # Better-auth endpoints
│   ├── globals.css        # Global styles + Tailwind
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── providers/        # Context providers
│   └── tracking/         # Analytics components
├── lib/                  # Library code
│   ├── api/             # API client (Axios)
│   ├── better-auth/     # Auth configuration
│   ├── db/              # Prisma client & schema
│   ├── emails/          # Email templates
│   ├── hooks/           # Custom React hooks
│   ├── resend/          # Email client
│   ├── stores/          # Zustand stores
│   ├── tracking/        # PostHog client
│   └── utils.ts         # Utility functions
└── utils/               # Utility functions
    └── environments.ts  # Environment helpers
```

## 🎯 Usage Examples

### Authentication

```typescript
import { signIn, signUp, signOut, useSession } from "@/lib/better-auth/auth-client";

// Sign up
await signUp.email({
  email: "user@example.com",
  password: "password123",
  name: "John Doe",
});

// Sign in
await signIn.email({
  email: "user@example.com",
  password: "password123",
});

// Get session
const { data: session } = useSession();

// Sign out
await signOut();
```

### API Requests with React Query

```typescript
import useApi from "@/lib/hooks/useApi";

function MyComponent() {
  const { useGet, usePost, usePut } = useApi();

  // GET request
  const { data, isLoading, error } = useGet("/users", { page: 1 });

  // POST request
  const createUser = usePost("/users", {
    onSuccess: () => {
      console.log("User created!");
    },
  });

  // PUT request
  const updateUser = usePut("/users");

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <button onClick={() => createUser.mutate({ name: "John" })}>
        Create User
      </button>
    </div>
  );
}
```

### State Management with Zustand

```typescript
import { useErrorStore } from "@/lib/stores/errorStore";

function MyComponent() {
  const { isError, statusCode, errorMessage, setError, clearError } = useErrorStore();

  // Use error state
  if (isError) {
    console.log(`Error ${statusCode}: ${errorMessage}`);
  }
}
```

### Sending Emails

```typescript
import { resendClient } from "@/lib/resend/resendClient";
import { render } from "@react-email/render";
import { WelcomeEmail } from "@/lib/emails/WelcomeEmail";

const emailHtml = await render(WelcomeEmail({ name: "John" }));

await resendClient.emails.send({
  from: "onboarding@resend.dev",
  to: "user@example.com",
  subject: "Welcome!",
  html: emailHtml,
});
```

### Using shadcn/ui Components

```typescript
import { Button } from "@/components/ui/button";

<Button variant="default">Click me</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
```

### PostHog Analytics

**Client-side:**
```typescript
import { usePostHog } from "posthog-js/react";

const posthog = usePostHog();
posthog.capture("event_name", { property: "value" });
```

**Server-side:**
```typescript
import { postHogClient } from "@/lib/tracking/postHogClient";

postHogClient.capture({
  distinctId: "user-id",
  event: "server_event",
  properties: { key: "value" },
});
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
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
- `tailwind.config.ts` - Tailwind CSS configuration (optional in v4)
- `postcss.config.mjs` - PostCSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration
- `supabase/config.toml` - Supabase local configuration

## 📚 Key Libraries Documentation

- [Next.js](https://nextjs.org/docs)
- [Prisma](https://www.prisma.io/docs)
- [Better-auth](https://www.better-auth.com/docs)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://docs.pmnd.rs/zustand)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [React Email](https://react.email)
- [PostHog](https://posthog.com/docs)

## 🚀 Deployment

### Environment Variables for Production

Make sure to set all environment variables in your hosting platform:
- Vercel: Project Settings → Environment Variables
- Railway: Variables tab
- Other platforms: Check their documentation

### Database

For production, use Supabase Cloud or your own PostgreSQL instance. Update `DATABASE_URL` and `DIRECT_URL` in your production environment.

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
