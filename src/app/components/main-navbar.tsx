"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";

export function MainNavbar() {
  const navItems = [
    {
      name: "Services",
      link: "/services",
    },
    // {
    //   name: "Success Stories",
    //   link: "/projects",
    // },
    {
      name: "Who We Are",
      link: "/team",
    },
    // {
    //   name: "Careers",
    //   link: "/careers",
    // },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo href="/" />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4 mr-4">
          <NavbarButton variant="primary" href="/contact">Innovation Hub</NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo href="/" />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="gradient"
              className="w-full"
              href="/contact"
            >
              Innovate with us
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
