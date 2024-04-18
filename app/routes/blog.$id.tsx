import { useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";

import { blog_data_one, blog_data_two } from "~/data/blog_data";

const BlogData = [...blog_data_one, ...blog_data_two];

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  const post_id = Number(id);

  const blogPost = BlogData.find((post) => post.id === post_id);

  //throw 404 if blog post not found

  return { blogPost };
}
export const meta: MetaFunction = () => {
  return [
    { title: "EDUC Project" },
    { name: "description", content: "Welcome to edPSY Project!" },
  ];
};

export default function BlogPost() {
  const { blogPost } = useLoaderData<typeof loader>();
  if (!blogPost) return null;

  return (
    <>
      <header className="bg-[#E9E6E0]">
        <NavBar textColor="black" fontWeight="md" />
      </header>
      <main className="bg-[#E9E6E0] px-28 py-12 font-mono text-center">
        <h2 className="text-2xl font-semibold my-16">{blogPost.title}</h2>
        <figure className="flex justify-center items-center space-x-24 my-8">
          {blogPost.images.map((image, index) => {
            return (
              <img
                key={index}
                src={image.url}
                alt=""
                style={{ width: image.width, height: image.height }}
              />
            );
          })}
        </figure>
        <div>
          {blogPost.content.map((paragraph, index) => {
            return (
              <p key={index} className="text-xl my-16">
                {paragraph}
              </p>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
