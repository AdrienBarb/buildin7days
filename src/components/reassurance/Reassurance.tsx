import Image from "next/image";

export function Reassurance() {
  const avatars = [
    { image: "/men-1.jpg" },
    { image: "/men-2.jpg" },
    { image: "/men-3.jpg" },
    { image: "/men-4.jpg" },
    { image: "/men-5.jpg" },
  ];

  return (
    <div className="flex items-center justify-center gap-3">
      <div className="flex -space-x-2">
        {avatars.map((avatar, i) => (
          <Image
            key={i}
            src={avatar.image}
            alt={`Builder ${i + 1}`}
            width={32}
            height={32}
            className="rounded-full border-2 border-background object-cover shadow-sm"
          />
        ))}
      </div>

      <p className="text-sm text-muted-foreground font-bold">
        Join <span className="text-primary">593</span> builders
      </p>
    </div>
  );
}
