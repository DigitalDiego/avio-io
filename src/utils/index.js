import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  apiVersion: "2023-01-16",
  useCdn: false,
  dataset: "production",
  token: import.meta.env.VITE_SANITY_TOKEN,
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export const fetchPosts = `*[_type == "post"] | order(_createdAt desc)`;

export const fetchPost = (id) => {
  const query = `*[_type == "post" && _id == "${id}"]`;
  return query;
};

export const fetchUserPosts = (id) => {
  const query = `*[_type == "post" && userId == "${id}"]`;
  return query;
};

export const fetchPostComments = (id) => {
  const query = `*[_type == "comment" && postId == "${id}"] | order(_createdAt desc)`;
  return query;
};
