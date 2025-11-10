import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/lib/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-6xl p-8">
      <h1 className="text-4xl font-bold mb-8">All Startups</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const imageUrl = post.image
            ? urlFor(post.image)?.width(400).height(300).url()
            : null;

          return (
            <Link
              href={`/posts/${post.slug.current}`}
              key={post._id}
              className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-card border border-input hover:border-primary transition-all"
            >
              {imageUrl ? (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-card" />
              )}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
