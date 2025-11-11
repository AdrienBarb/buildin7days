import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b border-input bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          <span className="text-primary">BUILD</span>
          <span className="text-foreground">IN</span>
          <span className="text-primary">7</span>
          <span className="text-foreground">DAYS</span>
        </Link>
        <div className="flex items-center gap-6">
          <a
            href="https://buildin7days.beehiiv.com/archive"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors"
          >
            All Startups
          </a>
        </div>
      </div>
    </nav>
  );
}
