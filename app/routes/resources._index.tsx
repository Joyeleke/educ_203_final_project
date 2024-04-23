import { MetaFunction } from "@remix-run/node";

import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";
import ResourcesCard from "~/components/ResourcesCard";

import {
  resources_grade_one_to_six,
  resources_grade_six_plus,
  resources_pre_k,
} from "~/data/resources_data";

export const meta: MetaFunction = () => {
  return [
    { title: "EDUC Project" },
    { name: "description", content: "Welcome to edPSY Project!" },
  ];
};

export default function Resources() {
  return (
    <>
      <header className="bg-[#E9E6E0] font-mono">
        <NavBar textColor="black" fontWeight="md" />
        <div className="flex flex-col lg:flex-row justify-between items-center px-6 lg:px-28 py-8 lg:py-16">
          <article>
            <p className="text-xl font-medium">Welcome to the</p>
            <h1 className="text-4xl font-black my-4">Resources Page</h1>
          </article>
          <figure>
            <img
              src="https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/boot@2x%20(1).png?t=2024-04-18T17%3A07%3A22.328Z"
              alt=""
            />
          </figure>
        </div>
      </header>
      <main className="bg-[#E9E6E0] px-6 lg:px-28  py-8 lg:py-16 font-mono">
        <section className="py-12">
          <h2 className="text-3xl my-6">Pre-K</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10">
            {resources_pre_k.map((resource, index) => {
              return (
                <ResourcesCard
                  key={index}
                  imageUrl={resource.imageUrl}
                  title={resource.title}
                  url={resource.url}
                />
              );
            })}
          </div>
        </section>
        <section className="py-12">
          <h2 className="text-3xl my-6">Grades 1 - 6</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10">
            {resources_grade_one_to_six.map((resource, index) => {
              return (
                <ResourcesCard
                  key={index}
                  imageUrl={resource.imageUrl}
                  title={resource.title}
                  url={resource.url}
                />
              );
            })}
          </div>
        </section>
        <section className="py-12">
          <h2 className="text-3xl my-6">Grades 6+</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10">
            {resources_grade_six_plus.map((resource, index) => {
              return (
                <ResourcesCard
                  key={index}
                  imageUrl={resource.imageUrl}
                  title={resource.title}
                  url={resource.url}
                />
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
