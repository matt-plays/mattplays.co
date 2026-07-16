import type { QueryParams } from "next-sanity";
import { client } from "./client";

/**
 * Fetch wrapper that tags every request so the Sanity webhook
 * (app/api/revalidate) can invalidate exactly what changed.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags: string[];
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { tags },
  });
}
