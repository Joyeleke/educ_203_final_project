import { Link } from "@nextui-org/react";

export default function Footer() {
  return (
    <footer className="bg-[#E9E6E0] grid grid-cols-1 lg:grid-cols-4 font-mono px-16 py-24 border-black border-t-2 gap-y-6">
      <article className="col-span-1 lg:col-span-2">
        <h3 className="text-2xl font-semibold mb-8">EDUC Final Project</h3>
        <p className="text-sm">1400 East Hanna Avenue</p>
        <p className="text-sm">Indianapolis, Indiana</p>
        <p className="text-sm mt-8">
          Inspired by{" "}
          <a
            href="https://comet-fluid-demo.squarespace.com/#colors:a=1.94,38.59,47.25;b=0,0,7.06;da=106.15,5.31,51.96;la=33.33,17.65,90;sda=1.94,38.59,47.25;sia=0,0,96.08;sida=0,0,96.08;sila=0,0,7.06;sla=0,0,96.08;w=0,0,96.08"
            className="text-red-500 underline"
          >
            Squarespace
          </a>
          . Made with{" "}
          <a href="https://remix.run/" className="text-red-500 underline">
            Remix
          </a>
        </p>
      </article>
      <article>
        <h3 className="text-2xl font-semibold mb-8">Info</h3>
        <ul className="text-sm flex space-x-4">
          <Link href="/about" className="text-red-400 underline tracking-wider">
            About
          </Link>
          <Link href="/blog" className="text-red-400 underline tracking-wider">
            Blog
          </Link>
          <Link href="/team" className="text-red-400 underline tracking-wider">
            Team
          </Link>
        </ul>
      </article>
      <article>
        <h3 className="text-2xl font-semibold mb-8">Copyright</h3>
        <p className="text-sm my-2">© {new Date().getFullYear()} EDUC 2023.</p>
        <p className="text-sm my-2">All rights reserved.</p>
      </article>
    </footer>
  );
}
