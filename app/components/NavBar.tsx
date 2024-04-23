import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";

type NavBarProps = { textColor: string; fontWeight: string };

export default function NavBar({ textColor, fontWeight }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["About", "Blog", "Team", "Resources"];
  const menuItemsLeft = ["About", "Blog"];
  const menuItemsRight = ["Team", "Resources"];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className={`font-mono bg-transparent text-${textColor} ${
        textColor === "black" ? "border-black border-b-2" : ""
      }`}
    >
      <NavbarContent className="hidden sm:flex gap-12" justify="center">
        {menuItemsLeft.map((item, index) => (
          <NavbarItem key={index}>
            <Link href={`/${item.toLowerCase()}`}>
              <p
                className={`text-${textColor} font-${fontWeight} tracking-wider`}
              >
                {item}
              </p>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="center">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <p className={`font-bold text-2xl text-${textColor}`}>
              ELA Visuals
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-12" justify="center">
        {menuItemsRight.map((item, index) => (
          <NavbarItem key={index}>
            <Link href={`/${item.toLowerCase()}`}>
              <p
                className={`text-${textColor} font-${fontWeight} tracking-wider`}
              >
                {item}
              </p>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full py-4"
              href={`/${item.toLowerCase()}`}
              size="lg"
            >
              <p className="text-black">{item}</p>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
