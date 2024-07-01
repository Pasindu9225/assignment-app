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

const Header = () => {
  return (
    <header className="bg-white shadow-lg">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a className="block text-teal-600 text-3xl font-bold" href="/">
              AI-content app
            </a>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                {linklist.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-teal-600 hover:text-gray-900 transition"
                  >
                    {link.name}
                  </a>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <a
                className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                href="#"
              >
                Start
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
