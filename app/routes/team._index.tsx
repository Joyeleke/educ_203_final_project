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
        <section className="px-12 lg:pr-12">
          <article className="grid grid-cols-1 lg:grid-cols-2 items-center gap-x-16 py-12">
            <figure className="lg:justify-self-end">
              <img
                src="https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/CadeauImages/1970255489376790035.jpg"
                alt=""
                className="rounded-full w-[20rem]"
              />
            </figure>
            <div>
              <h2 className="text-3xl my-6">Liana Beniam</h2>
              <p>Major: Information Systems</p>
            </div>
          </article>
          <article className="grid grid-cols-1 lg:grid-cols-2 items-center gap-x-16 py-12">
            <figure className="lg:justify-self-end">
              <img
                src="https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/CadeauImages/3339572213946857491.jpg"
                alt=""
                className="rounded-full w-[20rem]"
              />
            </figure>
            <div>
              <h2 className="text-3xl my-6">Amari Pinkin</h2>
              <p>Major: Nursing</p>
            </div>
          </article>
          <article className="grid grid-cols-1 lg:grid-cols-2 items-center gap-x-16 py-12">
            <figure className="lg:justify-self-end">
              <img
                src="https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/CadeauImages/_U6A3237%20smaller%20copy.jpeg"
                alt=""
                className="rounded-full w-[25rem]"
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
