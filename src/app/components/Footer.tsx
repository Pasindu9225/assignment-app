import React from "react";

const linklist = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Services",
    href: "/services",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-2xl font-bold text-teal-600">
          AI Assignment Generater
        </div>

        <nav className="mt-10 flex justify-center space-x-10">
          {linklist.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-gray-600 hover:text-gray-900 transition"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <p className="mt-10 text-center text-sm text-gray-500">
          &copy; 2024 Pasindu Gayan. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
