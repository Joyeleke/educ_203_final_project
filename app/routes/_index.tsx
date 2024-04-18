import type { MetaFunction } from "@remix-run/node";
import { Link } from "@nextui-org/react";

import NavBar from "../components/NavBar";
import Footer from "~/components/Footer";

import bannerImage from "../images/hammock.jpeg";
import sectionOneImage from "../images/paul-hanaoka-4ZaH0DGGomI-unsplash.jpg";
import sectionTwoImage from "../images/taylor-heery-g7dUm6lRvtQ-unsplash.jpg";
import sectionThreeImage from "../images/markus-spiske-OO89_95aUC0-unsplash.jpg";

export const meta: MetaFunction = () => {
  return [
    { title: "EDUC Project" },
    { name: "description", content: "Welcome to edPSY Project!" },
  ];
};

export default function Index() {
  return (
    <>
      <header className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bannerImage})` }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-25"></div>
        <NavBar textColor="white" fontWeight="bold" />
        <div
          id="banner"
          className="absolute inset-0 flex flex-col justify-center items-center text-white"
        >
          <h1 className="text-[5rem] mt-24">Learning ELA using </h1>
          <h1 className="text-[5rem] mb-72">Visuals</h1>
          <Link
            href="/blog"
            className="bg-white text-black font-bold text-xl px-20 py-6 mt-4"
          >
            Learn More
          </Link>
        </div>
      </header>
      <main className="bg-[#E9E6E0] font-mono">
        <section className="relative px-28 py-12">
          <div className="flex my-24">
            <figure className="w-[600px] h-[650px]">
              <img src={sectionOneImage} alt="" className="w-full h-full" />
            </figure>
            <article className="absolute w-[40rem] h-[24rem] z-10 left-[42rem] flex flex-col justify-center px-16 py-16 bg-white">
              <h2 className="text-3xl font-semibold mb-8">
                Do you know there are different kinds of English?
              </h2>
              <p className="text-md tracking-wider">
                There’s American English, British English, Australian English,
                and more! And then there’s Functional English, Academic English
                etc. So what category does ELA fall under?
              </p>
            </article>
          </div>
          <div className="flex justify-end my-24">
            <article className="absolute w-[45rem] h-[30rem] z-10 left-[7rem] flex flex-col justify-center px-16 py-16 bg-white">
              <h2 className="text-3xl font-semibold mb-8">
                ELA is an abbreviation for English Language Arts.
              </h2>
              <p className="text-md tracking-wider">
                It refers to the study and use of the English language in
                academic settings.The term is used in the United States and
                Canada. ELA encompasses reading, writing, listening, and
                speaking. Essentially, it’s a catch-all term used in education
                to cover all the subjects and topics related to the written and
                spoken language.
              </p>
            </article>
            <figure className="w-[600px] h-[650px]">
              <img src={sectionTwoImage} alt="" className="w-full h-full" />
            </figure>
          </div>
        </section>
        <section className="relative h-[35rem] px-16 py-16">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${sectionThreeImage})` }}
          ></div>
          <div className="absolute inset-0 bg-black opacity-5"></div>
          <div className="absolute">
            <h1 className="text-[3.5rem] text-white font-black">
              Keep students
            </h1>
            <h1 className="text-[3.5rem] text-white font-black">
              minds engaged{" "}
            </h1>
            <Link
              href="/blog"
              className="bg-white text-black font-bold text-xl px-20 py-4 mt-12"
            >
              Get Started
            </Link>
          </div>
        </section>
        {/* ADD A NEW SECTION HERE */}
      </main>
      <Footer />
    </>
  );
}
