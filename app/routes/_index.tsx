import type { MetaFunction } from "@remix-run/node";

import NavBar from "../components/NavBar";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <header>
        <NavBar/>
        <div id="#banner">
          <h1 className="text-md">How visuals help enhance ELA</h1>
          <button>Explore</button>
        </div>
      </header>
      <main>
        <section>

        </section>
        <section>
          
        </section>
        <section>
          
        </section>
      </main>
      <footer>
        <p>some footer text</p>
      </footer>
    </>
  );
}
