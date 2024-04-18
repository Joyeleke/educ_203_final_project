import { MetaFunction } from "@remix-run/node";
//
import Footer from "~/components/Footer";
import NavBar from "~/components/NavBar";

export const meta: MetaFunction = () => {
  return [
    { title: "EDUC Project" },
    { name: "description", content: "Welcome to edPSY Project!" },
  ];
};

export default function Team() {
  return (
    <>
      <header>
        <NavBar textColor="black" fontWeight="md" />
        <h1 className="text-4xl text-center font-black px-28 py- my-8">
          The Team
        </h1>
      </header>
      <main className="font-mono px-6 py-12">
        <section>
          <article className="grid grid-cols-2 items-center gap-x-16 py-12">
            <figure className="justify-self-end">
              <img
                src="https://picsum.photos/200/200"
                alt=""
                className="rounded-full"
              />
            </figure>
            <div>
              <h2 className="text-3xl my-6">Liana Beniam</h2>
              <p>Major: Information Systems</p>
            </div>
          </article>
          <article className="grid grid-cols-2 items-center gap-x-16 py-12">
            <figure className="justify-self-end">
              <img
                src="https://picsum.photos/200/200"
                alt=""
                className="rounded-full"
              />
            </figure>
            <div>
              <h2 className="text-3xl my-6">Amari Pinkin</h2>
              <p>Major: Nursing</p>
            </div>
          </article>
          <article className="grid grid-cols-2 items-center gap-x-16 py-12">
            <figure className="justify-self-end">
              <img
                src="https://picsum.photos/200/200"
                alt=""
                className="rounded-full"
              />
            </figure>
            <div>
              <h2 className="text-3xl my-6">Jesutofunmi Oyeleke</h2>
              <p>Major: Computer Science</p>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
