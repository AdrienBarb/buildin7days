import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "0w74cuw9",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});
