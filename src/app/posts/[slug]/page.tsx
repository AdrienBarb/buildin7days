import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/lib/sanity/client";
import Link from "next/link";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

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
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
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
                    <h1 className="text-3xl font-bold mb-4 mt-8">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold mb-2 mt-4">{children}</h3>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-bold">{children}</strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
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
    </main>
  );
}
