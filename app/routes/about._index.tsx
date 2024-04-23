import { Link } from "@nextui-org/react";
import { MetaFunction } from "@remix-run/node";

import NavBar from "~/components/NavBar";
import Footer from "~/components/Footer";

import wandImage from "../images/magic-wand.png";
import sectionOneImage from "../images/taylor-flowe-NTur2_QKpg0-unsplash.jpg";
import sectionTwoImage from "../images/1263544.jpeg";
import sectionThreeImage from "../images/tim-mossholder-WE_Kv_ZB1l0-unsplash.jpg";

export const meta: MetaFunction = () => {
  return [
    { title: "EDUC Project" },
    { name: "description", content: "Welcome to edPSY Project!" },
  ];
};

export default function About() {
  return (
    <>
      <header className="font-mono text-center">
        <NavBar textColor="black" fontWeight="md" />
        <article className="px-6 lg:px-28 py-16">
          <h1 className="text-4xl font-black my-8">About The Project</h1>
          <p className="my-6">
            Our main focus is on providing information on how visuals aid in
            English Language Arts (ELA). We believe that visuals play a crucial
            role in enhancing understanding and retention of information,
            especially in ELA.
          </p>
          <p className="my-6">
            They can help illustrate concepts, build context, and increase
            engagement. Through this project, we aim to provide resources,
            strategies, and practical examples of how visuals can be effectively
            integrated into ELA instruction.
          </p>
          <p className="my-6">
            Whether you&apos;re a teacher looking for innovative ways to spice
            up your lessons, or a student seeking to improve your understanding
            of ELA concepts, we hope this project will be a valuable resource
            for you.
          </p>
        </article>
      </header>
      <main className="bg-[#E9E6E0] font-mono">
        <section className="px-6 py-12 md:px-12 lg:px-28 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 py-12">
            <article>
              <figure>
                <img src={wandImage} alt="" />
              </figure>
              <h2 className="text-xl lg:text-3xl text-red-800 font-light my-8 lg:mt-36">
                ELA is a core subject in most schools in the United States and
                Canada. From the day they start school until the time they earn
                their high school diploma, a student’s schedule nearly always
                includes ELA.
              </h2>
            </article>
            <figure className="w-[350px] h-[500px] justify-self-center">
              <img src={sectionOneImage} alt="" className="w-full h-full" />
            </figure>
          </div>
          <div className="flex flex-col lg:block my-24 relative">
            <figure className="w-[20rem] lg:w-[660px]">
              <img src={sectionTwoImage} alt="" className="w-full h-full" />
            </figure>
            <article className="bg-[#E9E6E0] text-red-800 w-[20rem] lg:w-[40rem] h-[24rem] lg:absolute  lg:z-10 lg:top-[7rem] lg:left-[30rem] flex flex-col justify-center px-6 lg:px-12 py-12">
              <h2 className="text-2xl lg:text-4xl font-light italic mb-8">
                “Words mean more than what is set down on paper. It takes the
                human voice to infuse them with deeper meaning.”
              </h2>
              <p className="text-xl tracking-wider">- Maya Angelou</p>
            </article>
          </div>
        </section>
        <section className="relative h-[35rem] px-0 lg:px-16 py-16">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${sectionThreeImage})` }}
          ></div>
          <div className="absolute inset-0 bg-black opacity-5"></div>
          <div className="absolute flex flex-col justify-center text-center md:text-left">
            <h1 className="text-[3.5rem] text-white font-black ">Learn More</h1>
            <h1 className="text-[3.5rem] text-white font-black ">
              About ELA and Visuals{" "}
            </h1>
            <Link
              href="/blog"
              className="bg-white text-black font-bold text-xl px-12 lg:px-20 py-4 mt-12 mx-auto md:ml-0"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
