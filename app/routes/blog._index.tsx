import { MetaFunction } from "@remix-run/node";

import BlogPreview from "~/components/BlogPreview";
import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";

import { blog_data_one, blog_data_two } from "~/data/blog_data";

import SpaceShip from "../images/spaceship-blue@2x.png";

type BlogData = (typeof blog_data_one)[0];

export const meta: MetaFunction = () => {
  return [
    { title: "EDUC Project" },
    { name: "description", content: "Welcome to edPSY Project!" },
  ];
};

export default function Blog() {
  return (
    <>
      <header className="bg-[#E9E6E0] font-mono">
        <NavBar textColor="black" fontWeight="md" />
        <div className="flex justify-between items-center px-28 py-16">
          <article>
            <p className="text-xl font-medium">Welcome to</p>
            <h1 className="text-5xl font-black my-4">Our Blog Page</h1>
          </article>
          <figure>
            <img src={SpaceShip} alt="" />
          </figure>
        </div>
      </header>
      <main className="bg-[#E9E6E0] px-28 py-12 font-mono">
        <section className="grid grid-cols-2 gap-x-24 py-16">
          <article className="flex flex-col space-y-36">
            {blog_data_one.map((item: BlogData, index: number) => (
              <BlogPreview
                key={index}
                imageUrl={item.images[0]["url"]}
                title={item.title}
                id={item.id}
              />
            ))}
          </article>
          <article className="flex flex-col space-y-36">
            {blog_data_two.map((item: BlogData, index: number) => (
              <BlogPreview
                key={index}
                imageUrl={item.images[0]["url"]}
                title={item.title}
                id={item.id}
              />
            ))}
          </article>
        </section>
        <section className="my-16 flex justify-center">
          <figure>
            <img src={SpaceShip} alt="" />
          </figure>
        </section>
      </main>
      <Footer />
    </>
  );
}
