import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts, useLoaderData } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { NextUIProvider, Navbar, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarBrand, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { useState } from "react";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const stylesheet = "/assets/main-CNNTL3-B.css";
const links = () => [
  { rel: "stylesheet", href: stylesheet }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsx("body", { children: /* @__PURE__ */ jsxs(NextUIProvider, { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] }) })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App,
  links
}, Symbol.toStringTag, { value: "Module" }));
function NavBar({ textColor, fontWeight }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = ["About", "Blog", "Team", "Resources"];
  const menuItemsLeft = ["About", "Blog"];
  const menuItemsRight = ["Team", "Resources"];
  return /* @__PURE__ */ jsxs(
    Navbar,
    {
      onMenuOpenChange: setIsMenuOpen,
      className: `font-mono bg-transparent text-${textColor} ${textColor === "black" ? "border-black border-b-2" : ""}`,
      children: [
        /* @__PURE__ */ jsx(NavbarContent, { className: "hidden sm:flex gap-12", justify: "center", children: menuItemsLeft.map((item, index) => /* @__PURE__ */ jsx(NavbarItem, { children: /* @__PURE__ */ jsx(Link, { href: `/${item.toLowerCase()}`, children: /* @__PURE__ */ jsx(
          "p",
          {
            className: `text-${textColor} font-${fontWeight} tracking-wider`,
            children: item
          }
        ) }) }, index)) }),
        /* @__PURE__ */ jsxs(NavbarContent, { justify: "center", children: [
          /* @__PURE__ */ jsx(
            NavbarMenuToggle,
            {
              "aria-label": isMenuOpen ? "Close menu" : "Open menu",
              className: "sm:hidden"
            }
          ),
          /* @__PURE__ */ jsx(NavbarBrand, { children: /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx("p", { className: `font-bold text-2xl text-${textColor}`, children: "ELA Visuals" }) }) })
        ] }),
        /* @__PURE__ */ jsx(NavbarContent, { className: "hidden sm:flex gap-12", justify: "center", children: menuItemsRight.map((item, index) => /* @__PURE__ */ jsx(NavbarItem, { children: /* @__PURE__ */ jsx(Link, { href: `/${item.toLowerCase()}`, children: /* @__PURE__ */ jsx(
          "p",
          {
            className: `text-${textColor} font-${fontWeight} tracking-wider`,
            children: item
          }
        ) }) }, index)) }),
        /* @__PURE__ */ jsx(NavbarMenu, { children: menuItems.map((item, index) => /* @__PURE__ */ jsx(NavbarMenuItem, { children: /* @__PURE__ */ jsx(Link, { className: "w-full py-4", href: "#", size: "lg", children: /* @__PURE__ */ jsx("p", { className: "text-black", children: item }) }) }, `${item}-${index}`)) })
      ]
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "bg-[#E9E6E0] grid grid-cols-4 font-mono px-16 py-24 border-black border-t-2", children: [
    /* @__PURE__ */ jsxs("article", { className: "col-span-2", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold mb-8", children: "EDUC Final Project" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", children: "1400 East Hanna Avenue" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Indianapolis, Indiana" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm mt-8", children: [
        "Inspired by",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://comet-fluid-demo.squarespace.com/#colors:a=1.94,38.59,47.25;b=0,0,7.06;da=106.15,5.31,51.96;la=33.33,17.65,90;sda=1.94,38.59,47.25;sia=0,0,96.08;sida=0,0,96.08;sila=0,0,7.06;sla=0,0,96.08;w=0,0,96.08",
            className: "text-red-500 underline",
            children: "Squarespace"
          }
        ),
        ". Made with",
        " ",
        /* @__PURE__ */ jsx("a", { href: "https://remix.run/", className: "text-red-500 underline", children: "Remix" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("article", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold mb-8", children: "Info" }),
      /* @__PURE__ */ jsxs("ul", { className: "text-sm flex space-x-4", children: [
        /* @__PURE__ */ jsx(Link, { href: "/about", className: "text-red-400 underline tracking-wider", children: "About" }),
        /* @__PURE__ */ jsx(Link, { href: "/blog", className: "text-red-400 underline tracking-wider", children: "Blog" }),
        /* @__PURE__ */ jsx(Link, { href: "/team", className: "text-red-400 underline tracking-wider", children: "Team" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("article", { children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-semibold mb-8", children: "Copyright" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm my-2", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " EDUC 2023."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm my-2", children: "All rights reserved." })
    ] })
  ] });
}
function ResourcesCard({
  imageUrl,
  title,
  url
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("figure", { className: "w-[24rem] h-[24rem]", children: /* @__PURE__ */ jsx("img", { src: imageUrl, alt: "", className: "w-full h-full rounded-md" }) }),
    /* @__PURE__ */ jsx("h3", { className: "font-bold text-xl mt-6", children: title }),
    /* @__PURE__ */ jsx(Link, { href: url, className: "underline my-4 text-red-800 text-center", target: "_blank", children: "Explore Resource" })
  ] });
}
const resources_pre_k = [
  {
    id: 1,
    title: "Learn to Read",
    url: "https://www.starfall.com/h/ltr-classic/",
    imageUrl: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/unnamed.webp"
  },
  {
    id: 2,
    title: " Sight Words Hopper",
    url: "https://www.education.com/game/jump-in-sight-word-mud/",
    imageUrl: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/jump-in-sight-word-mud-2022-12-13.jpg"
  },
  {
    id: 3,
    title: "Find the Letter",
    url: "https://www.ixl.com/ela/pre-k/find-the-letter-in-the-alphabet-uppercase",
    imageUrl: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/webp_405d1d64-126d-45ce-8b68-a15b83eaf6a7.jpg"
  }
];
const resources_grade_one_to_six = [
  {
    id: 1,
    title: "ABC Slider Puzzle",
    url: "https://www.abcya.com/games/abc_slider_puzzle",
    imageUrl: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/webp_a2379a43-9f97-48e4-98ae-65caf73334b9.webp"
  },
  {
    id: 2,
    title: "Capitalization of Names",
    url: "https://www.ixl.com/ela/grade-3/capitalizing-the-names-of-people-and-pets-and-titles-of-respect",
    imageUrl: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/7160h91M4nL.__AC_SX300_SY300_QL70_FMwebp_.webp"
  },
  {
    id: 3,
    title: "Koala Paddle Boards",
    url: "https://www.abcya.com/games/spelling_practice",
    imageUrl: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/webp_a376f005-9d75-4faf-8946-cd07ddca00b4.webp"
  }
];
const resources_grade_six_plus = [
  {
    id: 1,
    title: "Word Clouds",
    url: "https://www.abcya.com/games/word_clouds",
    imageUrl: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/webp_a55c540b-2313-4984-99ca-e76e8c10eb07.webp"
  }
];
const meta$5 = () => {
  return [
    { title: "EDUC Project" },
    { name: "description", content: "Welcome to edPSY Project!" }
  ];
};
function Resources() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: "bg-[#E9E6E0] font-mono", children: [
      /* @__PURE__ */ jsx(NavBar, { textColor: "black", fontWeight: "md" }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center px-28 py-16", children: [
        /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xl font-medium", children: "Welcome to the" }),
          /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black my-4", children: "Resources Page" })
        ] }),
        /* @__PURE__ */ jsx("figure", { children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/boot@2x%20(1).png?t=2024-04-18T17%3A07%3A22.328Z",
            alt: ""
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "bg-[#E9E6E0] px-28 py-16 font-mono", children: [
      /* @__PURE__ */ jsxs("section", { className: "py-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl my-6", children: "Pre-K" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-y-10", children: resources_pre_k.map((resource, index) => {
          return /* @__PURE__ */ jsx(
            ResourcesCard,
            {
              imageUrl: resource.imageUrl,
              title: resource.title,
              url: resource.url
            },
            index
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "py-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl my-6", children: "Grades 1 - 6" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-y-10", children: resources_grade_one_to_six.map((resource, index) => {
          return /* @__PURE__ */ jsx(
            ResourcesCard,
            {
              imageUrl: resource.imageUrl,
              title: resource.title,
              url: resource.url
            },
            index
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "py-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl my-6", children: "Grades 6+" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-y-10", children: resources_grade_six_plus.map((resource, index) => {
          return /* @__PURE__ */ jsx(
            ResourcesCard,
            {
              imageUrl: resource.imageUrl,
              title: resource.title,
              url: resource.url
            },
            index
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Resources,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
const wandImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB2AAAAdgB+lymcgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAA3wSURBVHic3Zt7dNXVlcc/+/e7NwFBgi0uBeMDg+BIqjAoaF3juCzJyBRFbSGtVSvV4lQUMCZFI9JUrYIYykNZYn0/1ppCUQc6nUnGR4fO1DYWVKawBHlpkdGB5QCKIbm55zt/3Ed+95dfnlyYpXutu3J/9+6zz/7us89+nHti5JGKn9CV8liKscfElF1T7b1eyVmhvgfiPCWj3BkvFjRz+/9Osf351DVDXr4EDVmuQQbPmjgJMUrGM72V9ZlPhYkKE8d54oZEIeuO+bXG5EvXIOXNADGj0kR/E5gAccGQp1TWS3EDSctJv0q8JG8cu1qzkSxfOkOeDFD8uL5iMD2kNAY/6Y08S9KaNmJQXlxiXv81/GrgSxrYbWENOsN7VXPsNf2Hva7f8bpGBb+O9UbBDA39hU4gwXC1MhVjACmdCSzRhSc9qducx9rmGO99co0d6KbopCn1JiQPwVUJn9F91+g7TZdZY9TgPvUa2mpMwaiQMTo7VmAeiwV/m/msxwYYtkTleMyV8TUSDFBaq6CiOUobCz1B31YY8rQ+lvH7Vo8f77nWtnY0h0ES5YDeY3B8gGWoD7/rt1p3HLyMRZip7xqdgs9kGVOcGOul9cjRx0AiHpyrRwYYtkSFHqyQKMoKtraZ0s+/QYwWDA6tHGacgLgy5jgGuLSTqZKQjiUpqsY4HTGH9LYVFJixsN8/M0G/Vj/BBSiLM8pzUs/iNwHb9iwGHNNMDFEQ3Oek9nrm+WM/wUzgVhMt4ZiQ4UUUdjaPKR0DMkZw2L6r7CckKTfxUY48R5mJrxtY5HyhZydWBOfqkQE2VNtBD2ZHCD6EuDrRxNBt023r+9NsVSzJySbui+A96Ik7O5vHT6ZiQMYIHvgA+yfbq60+owxeiQSZMi44NpqYa47LQ/O/xXjb0msDALw705aa4zaEAoL7eGLWrmJaMnwWo8DErUElPfGpBxM+nGp/6GwOR5sB0kbwM98dnGQf73+Hv8Mx15QOlim+zR7c4ztKD0200kN/b/cajArOj/hleK5eZYHNt9mi4YvUAjxsGcMbY0d8zCmbYQeAS1CGR1EgMO73xKU7b+gcPLQFwUAg9XMYas0dgHv7v6xVJi6Q408Hr7J32glyVJiXnV8xn5WtIZZep8Ets2zZ8EW6Fjg/raicx+iSZbpfxieIbRbIDgaP7pzWNXgAS5LEC4x10Xp+doVtAjZFfdd/tUYmYWQmQBu8eWi8bQ/zHVYd4IkRaQ/DwORYZUYWcTA7IIZ3R+aQJ3Wyg1sVGCuFPKBbyjHFSOf+1Ccroth6bYAR8zXExHGZ58i0EzSCUdqVzJOe1hRnPIo4LqfeNXb3WEFHRWYxJIRjZRRbr0vhuFHanbQTSJGnFy9U3yhZw57XgJOe1DPAL00clyMLXt7zKS/1RLd+L+ocxIhAdnij6TL7IIq391vATykaWvk9gnkenOrgH4CCgCf48WMZADQFxZz6mL7e3MzzZgyVcrymScaPP76aR7BASdQN8jzOy6lOjYNIFiWn982Qz28N/ju9WgcM5sbinL5lpi3cPMNmxozhBk+bshH9lR038j+Z4RfXKnbqL3SPjLUmhoa85m0lOfeja+3hnoIHiLfyRk6KdJT1W8OsKN7Dai1HzNexns/oRAFvb50R3eiMWKqhEsVbTuT3TLEkQMkjGpb0eR5jnAyU2auGk7Gwz2fM2TrDmg9HtwGrdDce9wTktySNvwk3UHntrbtDJY/oZBnrZQwKAEfGXozvfHCjvZqXiWrlFZ1DvWC82ubYEU/y1/uutH0ZtrwdiHSXJMoMBkUEzkE4lpzyuO4vflxjD/vgo9Zcq8c1wd7BxNBWnyeCso+6BwxbohL5bMA4RmRXJugJmfe78ViNeHlAf17fOMVauhAdSUUr9Q18GmR4AfkzPrvclsL/gwEga4RpGJMEIzoxQub1icEPd021F3sz38AX9VPB3IC8Zudz4ecTbV1eDTBivo6N+VxrYu+fq1jZnQh+2nKd6bXynDzO7coIA/sxONITlis+qD/f8nxOdrAfD1zgaxkHnUcdxgkBedvizYw5rFI4TAWwSo4yDM56iJJN8EBXY/xWJmKcm1M2wy6D4wWFgRX6yv6DXAL8a44AyU54gZWCSXKpOiL7NzA4omYpaSmkLq9B0MT5mcDmi/O74j9jqapMLAhVjI0+lPbxOd7E3aF+f1JYxonPM93EpA6rUeiwWvXEFfk2wGNp4QnEU52CX5wCH1TMg0bzKN9+k+3ffIN92sdnsYnmbD/vuDwYwU98WiPN8WCXJXlHRoB/y3sQHH2/znKO/e/MsQ874jnz56qSsSC0zxtdPAU+w3f6chUl4c8YxRleB+N23WiNw5aosGkAfxCMCsSMtXg8nMwI8PBkFIVjQtIYgPHB/k9ZndcYAPBWjUX251nwdao0sSDzLMCD9bEEEzbekgteSerNozjI66e2QWNTf36GGBXoHfYZXLv7e9FNT0d0VNPgyDpVStSFVn59zFG2sdI+yfCdvlxFJKmHdqUygk3y+BHG65ncnm55v7t7qv1jT3U6agYofVBVGAtCxU9jcwvl2+/IXXkvQYOMsVj6QKR9WtxLupROG+XZD39g3++NXkelFD57Xijak4r2UeBjzTSYGJtznuD4U7uyue39jr4F3Npb3Y64Ac65P7XnQxF4vXlMyAE/T0UFTdSTBh9IfTU+XBcV4RFOxtSt3f/JrR3lPQgGafR96T1Pzl5b72KhPT9PRYUF1EuMy8Q0A8yo2XKzPQBQskybESMIfg/3ffAD+/fD0fGIecCYe1Rloi5n5RyNBeKSIPgx81TUJ0YDYlxw5SWqt9xibZWk+KdAsQTij6ft5t7IyWvlnfysSotXRB/BBemIGOC8e1RFZs+3vRpjHuXrAm4/Zp6KmmOhPZ96Vb830x4KyrQkjyE+Txthr5/kmt/WWviYn5ErVFB8Kq+7JP/lPmf74Md1ame65t0A59WqCseCzGqlwjiNvh8B3mjAMTYQGDFR/e5tueABts6wbZbkbMRUfMZsmx796/KnB5hqjovSsk70Y533I3lNg+ffrUpnoTwP6wtE2Ru1uW7fKuoVOhJzULOp2rpsoDqiMcsV3+OxGWNooOtLCkp3T7V3o8bkzQPOv0uVhPe8osEnk9SH9zzu8MADfALfNzE0tPV8M+7qaExePOCCO9NFTmDlMRpbmylfNz/X7V2CBoyxoeKmesMd7d2+Kxq2RMcrznCJ4Q7OwOM6jJMiCqekjIcxNst4zzm2fnQ972N2+BeOLpzdBj5Y4SUS7cHTHKjw0i9nVG+o6Rn4i2sV2/VVVmJMkmEdVIxOhhc6VCHAu9GSTDisLXDRbFUZ7aN9O/CzVeQdosHIjfao5+ABdn+VMk9cYUqfOeWeJ2Tk32yiqZNfq0Y6j1t6bYCLqtPRPi0w08+3JNuDjxXSkK3w2hStfntOx+BLF+jK0gVafdYC3Rk+IbYkHyJcB8A+w/HAzptsuQfXm9jdkRE84/1ebYGLK6P7+Sbag4/HU24fdEE8qt+c2zH4s+erWLBdRhwD5zFl0+2W8+PmmYt0uzMeCrn4ziRcsHO6fZTVtVaxHUN4ScbEnK0HLw1OUNFjD7hkVqrICblbY58I8AV+YOXbTmc6BQ9goshEPHtSlGRQmOfdWVZnMCt0U+U0Hx4N8u08gVtNTAwVWisGJ6hYd5MlemSAS2a0gQ8IayzwKH8lBL6vF13hvVnb9Z5/5w7baKIOcQBRr895Lopv80xbbI7pISPkXIQ0MSrUQL3wl2O5et1NloAepMHxM1QlsSAUwRvjBbngx89W0SFoEO2j/R9/1vOA1xUNW6IBvmNfJhs4YwvGmzK+ifG2Ur8yT8gWWz6Xf3CjrcmM71Y3WDZdlbg0eGWttr6PMaE+BL7FUW+ZVNcWmGremJd/8ACxBKWpZJc9XhsuUrdRBBeH7zF6jlKg+wa49EeqdKIu+0EK2Pq4T1n9z9sqvPGzVdTSSj2WammzvI6a/3zw8Cq8TkmUZk5+U4+5bi3IuamCY2RweKcGmHBTyu2DPTrQSAvl9UtzVz7RQoNnjFWA14zqtQ8emZXPkA9nOUWADj+nQYjcqzodBsFv/jA32qet3KgWyl95LAB+mopcEw2eGEsub/Xa+UcWPEAmAAbmbjGxjCQlJqrMsTdUJyg4PNIAl90QHe1doj14FbZVeAH+6rULjgJ4IN7KYoN3TRwEnlMrZ26eZdO33Gbbt8ywOkGJJ35qYh9iLzAnOL5dFrjsBlWJ1Ll9tniBxhZrD94K0kVOWlI60la/tujogA/S5BXyV6ZvoETSCvkXb8LChyg5Brj8elWS7uczxaeM9a2irP6JQMCbpiIvlgp4gaNpMGpeXXIEA94RoOwFxCuvUyVQl2MRLxq871NvMA7aLCjviwce0gb41jWqFG2pLpPnW6w9+Dht4AP8Na88/MUDD+B/+7u6WcbiUDBoLCxg/OrH2y4TjZ+mokJHA+GVN6obltmDR0vhfFMMuNeUkzs3xPtQvjIQ8CZPU1FTkgZgbOazNH91w7KjH/DySZ7BX0IprCTxeds/Gk2epqJDLanGBtryvCeq/2X5Fxs8gE3+nr6G41XB8YGe/aCDifFjeKulOfcMT5Za+TVPfPHBQ9rrOzKCjG0yzs45+PC+POAhUAdUVOivnMdrghM7uKWFPGpWP/XFjPYdUU7w79QIHjUvP/PlAg8RpXCkETxqXnzuywceOjgRqqhQqfN4TnCKPO5a9YI9GsX3ZaD/A3teYUQ7m5yYAAAAAElFTkSuQmCC";
const sectionOneImage$1 = "/assets/taylor-flowe-NTur2_QKpg0-unsplash-BBcEEmKK.jpg";
const sectionTwoImage$1 = "/assets/1263544-v4ZvGdq6.jpeg";
const sectionThreeImage$1 = "/assets/tim-mossholder-WE_Kv_ZB1l0-unsplash-D63cjiZr.jpg";
const meta$4 = () => {
  return [
    { title: "EDUC Project" },
    { name: "description", content: "Welcome to edPSY Project!" }
  ];
};
function About() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: "font-mono text-center", children: [
      /* @__PURE__ */ jsx(NavBar, { textColor: "black", fontWeight: "md" }),
      /* @__PURE__ */ jsxs("article", { className: "px-28 py-16", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black my-8", children: "About The Project" }),
        /* @__PURE__ */ jsx("p", { className: "my-6", children: "Our main focus is on providing information on how visuals aid in English Language Arts (ELA). We believe that visuals play a crucial role in enhancing understanding and retention of information, especially in ELA." }),
        /* @__PURE__ */ jsx("p", { className: "my-6", children: "They can help illustrate concepts, build context, and increase engagement. Through this project, we aim to provide resources, strategies, and practical examples of how visuals can be effectively integrated into ELA instruction." }),
        /* @__PURE__ */ jsx("p", { className: "my-6", children: "Whether you're a teacher looking for innovative ways to spice up your lessons, or a student seeking to improve your understanding of ELA concepts, we hope this project will be a valuable resource for you." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "bg-[#E9E6E0] font-mono", children: [
      /* @__PURE__ */ jsxs("section", { className: "px-28 py-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 py-12", children: [
          /* @__PURE__ */ jsxs("article", { children: [
            /* @__PURE__ */ jsx("figure", { children: /* @__PURE__ */ jsx("img", { src: wandImage, alt: "" }) }),
            /* @__PURE__ */ jsx("h2", { className: "text-3xl text-red-800 font-light mt-36", children: "ELA is a core subject in most schools in the United States and Canada. From the day they start school until the time they earn their high school diploma, a student’s schedule nearly always includes ELA." })
          ] }),
          /* @__PURE__ */ jsx("figure", { className: "w-[350px] h-[500px] justify-self-center", children: /* @__PURE__ */ jsx("img", { src: sectionOneImage$1, alt: "", className: "w-full h-full" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex my-24 relative", children: [
          /* @__PURE__ */ jsx("figure", { className: "w-[660px]", children: /* @__PURE__ */ jsx("img", { src: sectionTwoImage$1, alt: "", className: "w-full h-full" }) }),
          /* @__PURE__ */ jsxs("article", { className: "absolute w-[40rem] h-[24rem] z-10 top-[7rem] left-[30rem] flex flex-col justify-center px-12 py-12 bg-[#E9E6E0] text-red-800", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-4xl font-light italic mb-8", children: "“Words mean more than what is set down on paper. It takes the human voice to infuse them with deeper meaning.”" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl tracking-wider", children: "- Maya Angelou" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "relative h-[35rem] px-16 py-16", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 bg-cover bg-center",
            style: { backgroundImage: `url(${sectionThreeImage$1})` }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black opacity-5" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-[3.5rem] text-white font-black", children: "Learn More" }),
          /* @__PURE__ */ jsxs("h1", { className: "text-[3.5rem] text-white font-black", children: [
            "About ELA and Visuals",
            " "
          ] }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/blog",
              className: "bg-white text-black font-bold text-xl px-20 py-4 mt-12",
              children: "Get Started"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: About,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function BlogPreview({ imageUrl, title, id }) {
  return /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("figure", { className: "w-full h-full", children: /* @__PURE__ */ jsx("img", { src: imageUrl, alt: "", className: "rounded-md" }) }),
    /* @__PURE__ */ jsx("h3", { className: "font-bold text-xl", children: title }),
    /* @__PURE__ */ jsx(Link, { href: `/blog/${id}`, className: "underline my-4 text-black", children: "Read More" })
  ] });
}
const blog_data_one = [
  {
    id: 1,
    title: "What is ELA?",
    images: [
      {
        url: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/ivan-shilov-ucUB9wxkPgY-unsplash.jpg",
        width: "22rem",
        height: "30rem"
      },
      {
        url: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/towfiqu-barbhuiya-5u6bz2tYhX8-unsplash.jpg",
        width: "25rem",
        height: "25rem"
      }
    ],
    content: [
      "ELA is an abbreviation for English Language Arts. It refers to the study and use of the English language in academic settings. The term is used in the United States and Canada. ELA encompasses reading, writing, listening, and speaking. It is often taught as a separate subject in elementary and secondary schools. The course focuses on the mechanics of writing, such as grammar, punctuation, and spelling. It also covers reading comprehension and literary analysis. Essentially, it’s a catch-all term used in education to cover all the subjects and topics related to the written and spoken language.",
      "In school, ELA refers to the study of the English language and literature. It encompasses reading fiction and non-fiction texts, as well as writing and speaking in English. ELA is a core subject in most schools in the United States and Canada. From the day they start school until the time they earn their high school diploma, a student’s schedule nearly always includes ELA. We highly recommend all students to study ELA as it is an important foundation for success in college and in their careers.",
      "The core principles of ELA are reading, writing, speaking, communication, creativity, research and listening. These skills are essential for success in school and in life. ELA helps students develop critical thinking skills, communication skills, and creativity. It also helps students develop a love of reading and writing. ELA is an important subject because it teaches students how to communicate effectively in English. It helps them develop the skills they need to succeed in school and in life."
    ]
  },
  {
    id: 2,
    title: "Why is English important?",
    images: [
      {
        url: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/huma-h-yardim-oCPDom0y_yI-unsplash.jpg",
        width: "55rem",
        height: "35rem"
      }
    ],
    content: [
      "English is not just a language. It is an international communication tool. It is the language of science, technology, business, and diplomacy. English is the most widely spoken language in the world. It is the official language of many countries, including the United States, and it is one of the six official languages of the United Nations. So, if you’re thinking why is English Language Arts important, there are many more reasons like these.",
      "English holds paramount significance in the contemporary global landscape due to its multifaceted roles. As the lingua franca of international communication, it bridges linguistic divides, facilitating interactions in diverse spheres such as business, academia, and diplomacy. Its dominance in global business operations underscores its pivotal role in driving economic exchanges and fostering collaboration across borders. Moreover, English serves as the medium through which knowledge is disseminated, making proficiency indispensable for accessing educational resources and staying abreast of advancements in various fields.",
      "Culturally, it acts as a conduit for cross-cultural understanding, enabling individuals to engage with diverse perspectives and expressions worldwide. Additionally, in the realm of travel and tourism, English proficiency eases navigation and communication, enhancing the overall travel experience. Its prevalence in science and technology underscores its instrumental role in facilitating innovation and collaboration on a global scale. Ultimately, mastery of English not only unlocks myriad opportunities for personal and professional growth but also fosters interconnectedness in an increasingly globalized world."
    ],
    width: "full"
  },
  {
    id: 3,
    title: "What is the difference between ELA and English?",
    images: [
      {
        url: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/markus-spiske-I-0OS5iRp0Q-unsplash.jpg",
        width: "40rem",
        height: "30rem"
      }
    ],
    content: [
      "English is a language, while ELA is a subject that teaches students how to read, write, listen, and speak in English.",
      "English is the language spoken by people in the United States, Canada, and other English-speaking countries. ELA is the study of that language.",
      "ELA is an important subject because it teaches students how to communicate effectively in English. It helps them develop the skills they need to succeed in school and in life."
    ]
  }
];
const blog_data_two = [
  {
    id: 4,
    title: "Why is ELA important?",
    images: [
      {
        url: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/patrick-tomasso-Oaqk7qqNh_c-unsplash.jpg",
        width: "40rem",
        height: "30rem"
      }
    ],
    content: [
      "Overall, English Language Arts are vital for individuals to be able to communicate their thoughts and ideas effectively. It is an essential skill for success in many academic disciplines like history, philosophy, and the sciences. Furthermore, many professions, such as law, business, and journalism, require a good command of the English language. Now you know why the English Language Arts is important. It helps one succeed both academically and professionally. And if you are an avid traveler, knowing English will definitely come in handy when you visit English-speaking countries! So what are you waiting for? Start honing your English language arts skills today!",
      "Perhaps NCTE member Dana Maloney puts it best: “We teach the most essential human skills: how to receive information from others and how to transmit information. This is literacy. Through reading and listening, we receive information; through writing and speaking, we transmit information.” Learning to communicate is one of the most basic of human accomplishments. When we can’t clearly express our own ideas to others, we leave ourselves open to misinterpretation and misunderstanding. If we can’t read well, we miss out on much valuable information. Being able to think, speak, read, and write clearly is absolutely vital in our society. More than that, language arts encourage creativity and freedom of expression."
    ]
  },
  {
    id: 5,
    title: "How can I improve my ELA skills?",
    images: [
      {
        url: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/foad-roshan-gvavzXpmnC0-unsplash.jpg",
        width: "40rem",
        height: "30rem"
      }
    ],
    content: [
      "There are many ways to improve your ELA skills. Here are a few tips to help you get started:",
      "Read every day. Reading is one of the best ways to improve your ELA skills. It helps you develop your vocabulary, improve your reading comprehension, and learn how to analyze and interpret texts.",
      "Write every day. Writing is another important skill to develop. It helps you improve your grammar, punctuation, and spelling. It also helps you develop your critical thinking skills and learn how to express your ideas clearly and concisely.",
      "Practice listening and speaking. Listening and speaking are also important skills to develop. They help you improve your communication skills and learn how to express yourself effectively in English."
    ]
  },
  {
    id: 6,
    title: "How visuals support ELA",
    images: [
      {
        url: "https://ezxeabxdawiisodycekr.supabase.co/storage/v1/object/public/EDUC_Images/alex-litvin-MAYsdoYpGuk-unsplash.jpg",
        width: "40rem",
        height: "30rem"
      }
    ],
    content: [
      "As educators, we know how important multiple means of representation are to effective teaching. 80% of the information we process is visual, and yet most literacy in classrooms focuses on reading words, rather than reading images or other visual representations.",
      "As our world becomes increasingly digital, students are tasked with even more visual input. Now, more than ever, students are reading more than words every day and need to be able to show their thinking in a variety of ways through a variety of media"
    ]
  }
];
const SpaceShip = "/assets/spaceship-blue@2x-DY2ULnL7.png";
const meta$3 = () => {
  return [
    { title: "EDUC Project" },
    { name: "description", content: "Welcome to edPSY Project!" }
  ];
};
function Blog() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: "bg-[#E9E6E0] font-mono", children: [
      /* @__PURE__ */ jsx(NavBar, { textColor: "black", fontWeight: "md" }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center px-28 py-16", children: [
        /* @__PURE__ */ jsxs("article", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xl font-medium", children: "Welcome to" }),
          /* @__PURE__ */ jsx("h1", { className: "text-5xl font-black my-4", children: "Our Blog Page" })
        ] }),
        /* @__PURE__ */ jsx("figure", { children: /* @__PURE__ */ jsx("img", { src: SpaceShip, alt: "" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "bg-[#E9E6E0] px-28 py-12 font-mono", children: [
      /* @__PURE__ */ jsxs("section", { className: "grid grid-cols-2 gap-x-24 py-16", children: [
        /* @__PURE__ */ jsx("article", { className: "flex flex-col space-y-36", children: blog_data_one.map((item, index) => /* @__PURE__ */ jsx(
          BlogPreview,
          {
            imageUrl: item.images[0]["url"],
            title: item.title,
            id: item.id
          },
          index
        )) }),
        /* @__PURE__ */ jsx("article", { className: "flex flex-col space-y-36", children: blog_data_two.map((item, index) => /* @__PURE__ */ jsx(
          BlogPreview,
          {
            imageUrl: item.images[0]["url"],
            title: item.title,
            id: item.id
          },
          index
        )) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "my-16 flex justify-center", children: /* @__PURE__ */ jsx("figure", { children: /* @__PURE__ */ jsx("img", { src: SpaceShip, alt: "" }) }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Blog,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
const meta$2 = () => {
  return [
    { title: "EDUC Project" },
    { name: "description", content: "Welcome to edPSY Project!" }
  ];
};
function Team() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsx(NavBar, { textColor: "black", fontWeight: "md" }),
      /* @__PURE__ */ jsx("h1", { className: "text-4xl text-center font-black px-28 py- my-8", children: "The Team" })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "font-mono px-6 py-12", children: /* @__PURE__ */ jsxs("section", { children: [
      /* @__PURE__ */ jsxs("article", { className: "grid grid-cols-2 items-center gap-x-16 py-12", children: [
        /* @__PURE__ */ jsx("figure", { className: "justify-self-end", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://picsum.photos/200/200",
            alt: "",
            className: "rounded-full"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl my-6", children: "Liana Beniam" }),
          /* @__PURE__ */ jsx("p", { children: "Major: Information Systems" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "grid grid-cols-2 items-center gap-x-16 py-12", children: [
        /* @__PURE__ */ jsx("figure", { className: "justify-self-end", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://picsum.photos/200/200",
            alt: "",
            className: "rounded-full"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl my-6", children: "Amari Pinkin" }),
          /* @__PURE__ */ jsx("p", { children: "Major: Nursing" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("article", { className: "grid grid-cols-2 items-center gap-x-16 py-12", children: [
        /* @__PURE__ */ jsx("figure", { className: "justify-self-end", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: "https://picsum.photos/200/200",
            alt: "",
            className: "rounded-full"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-3xl my-6", children: "Jesutofunmi Oyeleke" }),
          /* @__PURE__ */ jsx("p", { children: "Major: Computer Science" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Team,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const BlogData = [...blog_data_one, ...blog_data_two];
async function loader({ params }) {
  const { id } = params;
  const post_id = Number(id);
  const blogPost = BlogData.find((post) => post.id === post_id);
  return { blogPost };
}
const meta$1 = () => {
  return [
    { title: "EDUC Project" },
    { name: "description", content: "Welcome to edPSY Project!" }
  ];
};
function BlogPost() {
  const { blogPost } = useLoaderData();
  if (!blogPost)
    return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("header", { className: "bg-[#E9E6E0]", children: /* @__PURE__ */ jsx(NavBar, { textColor: "black", fontWeight: "md" }) }),
    /* @__PURE__ */ jsxs("main", { className: "bg-[#E9E6E0] px-28 py-12 font-mono text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold my-16", children: blogPost.title }),
      /* @__PURE__ */ jsx("figure", { className: "flex justify-center items-center space-x-24 my-8", children: blogPost.images.map((image, index) => {
        return /* @__PURE__ */ jsx(
          "img",
          {
            src: image.url,
            alt: "",
            style: { width: image.width, height: image.height }
          },
          index
        );
      }) }),
      /* @__PURE__ */ jsx("div", { children: blogPost.content.map((paragraph, index) => {
        return /* @__PURE__ */ jsx("p", { className: "text-xl my-16", children: paragraph }, index);
      }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: BlogPost,
  loader,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const bannerImage = "/assets/hammock-ByZun1-i.jpeg";
const sectionOneImage = "/assets/paul-hanaoka-4ZaH0DGGomI-unsplash-Bli4BAFr.jpg";
const sectionTwoImage = "/assets/taylor-heery-g7dUm6lRvtQ-unsplash-CCoPs_91.jpg";
const sectionThreeImage = "/assets/markus-spiske-OO89_95aUC0-unsplash-NE9uNXXt.jpg";
const meta = () => {
  return [
    { title: "EDUC Project" },
    { name: "description", content: "Welcome to edPSY Project!" }
  ];
};
function Index() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: "relative h-screen", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0 bg-cover bg-center",
          style: { backgroundImage: `url(${bannerImage})` }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black opacity-25" }),
      /* @__PURE__ */ jsx(NavBar, { textColor: "white", fontWeight: "bold" }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          id: "banner",
          className: "absolute inset-0 flex flex-col justify-center items-center text-white",
          children: [
            /* @__PURE__ */ jsx("h1", { className: "text-[5rem] mt-24", children: "Learning ELA using " }),
            /* @__PURE__ */ jsx("h1", { className: "text-[5rem] mb-72", children: "Visuals" }),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: "/blog",
                className: "bg-white text-black font-bold text-xl px-20 py-6 mt-4",
                children: "Learn More"
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "bg-[#E9E6E0] font-mono", children: [
      /* @__PURE__ */ jsxs("section", { className: "relative px-28 py-12", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex my-24", children: [
          /* @__PURE__ */ jsx("figure", { className: "w-[600px] h-[650px]", children: /* @__PURE__ */ jsx("img", { src: sectionOneImage, alt: "", className: "w-full h-full" }) }),
          /* @__PURE__ */ jsxs("article", { className: "absolute w-[40rem] h-[24rem] z-10 left-[42rem] flex flex-col justify-center px-16 py-16 bg-white", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold mb-8", children: "Do you know there are different kinds of English?" }),
            /* @__PURE__ */ jsx("p", { className: "text-md tracking-wider", children: "There’s American English, British English, Australian English, and more! And then there’s Functional English, Academic English etc. So what category does ELA fall under?" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end my-24", children: [
          /* @__PURE__ */ jsxs("article", { className: "absolute w-[45rem] h-[30rem] z-10 left-[7rem] flex flex-col justify-center px-16 py-16 bg-white", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold mb-8", children: "ELA is an abbreviation for English Language Arts." }),
            /* @__PURE__ */ jsx("p", { className: "text-md tracking-wider", children: "It refers to the study and use of the English language in academic settings.The term is used in the United States and Canada. ELA encompasses reading, writing, listening, and speaking. Essentially, it’s a catch-all term used in education to cover all the subjects and topics related to the written and spoken language." })
          ] }),
          /* @__PURE__ */ jsx("figure", { className: "w-[600px] h-[650px]", children: /* @__PURE__ */ jsx("img", { src: sectionTwoImage, alt: "", className: "w-full h-full" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "relative h-[35rem] px-16 py-16", children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 bg-cover bg-center",
            style: { backgroundImage: `url(${sectionThreeImage})` }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black opacity-5" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-[3.5rem] text-white font-black", children: "Keep students" }),
          /* @__PURE__ */ jsxs("h1", { className: "text-[3.5rem] text-white font-black", children: [
            "minds engaged",
            " "
          ] }),
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/blog",
              className: "bg-white text-black font-bold text-xl px-20 py-4 mt-12",
              children: "Get Started"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-CAhGnq6I.js", "imports": ["/assets/index-CO0oJy5u.js", "/assets/components-CFrPg38m.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-bHMI_Wr4.js", "imports": ["/assets/index-CO0oJy5u.js", "/assets/components-CFrPg38m.js", "/assets/import-BdgUZHvN.js"], "css": [] }, "routes/resources._index": { "id": "routes/resources._index", "parentId": "root", "path": "resources", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/resources._index-BV4EdDLC.js", "imports": ["/assets/index-CO0oJy5u.js", "/assets/import-BdgUZHvN.js", "/assets/Footer-DepMYPtM.js"], "css": [] }, "routes/about._index": { "id": "routes/about._index", "parentId": "root", "path": "about", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/about._index-Biwdk-da.js", "imports": ["/assets/index-CO0oJy5u.js", "/assets/import-BdgUZHvN.js", "/assets/Footer-DepMYPtM.js"], "css": [] }, "routes/blog._index": { "id": "routes/blog._index", "parentId": "root", "path": "blog", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/blog._index-Bs89naMW.js", "imports": ["/assets/index-CO0oJy5u.js", "/assets/import-BdgUZHvN.js", "/assets/Footer-DepMYPtM.js"], "css": [] }, "routes/team._index": { "id": "routes/team._index", "parentId": "root", "path": "team", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/team._index-BhIYQsqT.js", "imports": ["/assets/index-CO0oJy5u.js", "/assets/import-BdgUZHvN.js", "/assets/Footer-DepMYPtM.js"], "css": [] }, "routes/blog.$id": { "id": "routes/blog.$id", "parentId": "root", "path": "blog/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/blog._id-ko41keHP.js", "imports": ["/assets/index-CO0oJy5u.js", "/assets/import-BdgUZHvN.js", "/assets/Footer-DepMYPtM.js", "/assets/components-CFrPg38m.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-COwmFsJJ.js", "imports": ["/assets/index-CO0oJy5u.js", "/assets/import-BdgUZHvN.js", "/assets/Footer-DepMYPtM.js"], "css": [] } }, "url": "/assets/manifest-e66ee82a.js", "version": "e66ee82a" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/resources._index": {
    id: "routes/resources._index",
    parentId: "root",
    path: "resources",
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/about._index": {
    id: "routes/about._index",
    parentId: "root",
    path: "about",
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/blog._index": {
    id: "routes/blog._index",
    parentId: "root",
    path: "blog",
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "routes/team._index": {
    id: "routes/team._index",
    parentId: "root",
    path: "team",
    index: true,
    caseSensitive: void 0,
    module: route4
  },
  "routes/blog.$id": {
    id: "routes/blog.$id",
    parentId: "root",
    path: "blog/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route6
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
