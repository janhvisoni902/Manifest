import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: (import.meta.env && import.meta.env.VITE_SANITY_PROJECT_ID) || '22a5c58r',
  dataset: (import.meta.env && import.meta.env.VITE_SANITY_DATASET) || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

const builder = createImageUrlBuilder(sanityClient);


export function urlFor(source) {
  if (!source) return null;
  try {
    return builder.image(source);
  } catch (err) {
    return null;
  }
}

export async function getServices() {
  const query = `*[_type == "service"] | order(order asc){ _id, title, description, category, order }`;
  return await sanityClient.fetch(query);
}

export async function getBlogs() {
  const query = `*[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc){
    _id,
    title,
    "slug": slug.current,
    mainImage,
    tag,
    author,
    date,
    publishedAt,
    readTime,
    image,
    excerpt,
    body,
    content
  }`;
  return await sanityClient.fetch(query);
}

export async function getPostBySlug(slug) {
  if (!slug) return null;
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    mainImage,
    tag,
    author,
    date,
    publishedAt,
    readTime,
    image,
    body,
    content
  }`;
  return await sanityClient.fetch(query, { slug });
}


export async function getMediaMentions(start = 0, limit = 12) {
  const query = `*[_type == "mediaMention"] | order(publishedDate desc) [$start...$end]{
    _id,
    title,
    publicationName,
    externalUrl,
    publishedDate,
    thumbnail,
    excerpt
  }`;
  return await sanityClient.fetch(query, { start: Number(start), end: Number(start + limit) });
}

export async function getMediaMentionsCount() {
  const query = `count(*[_type == "mediaMention"])`;
  return await sanityClient.fetch(query);
}



