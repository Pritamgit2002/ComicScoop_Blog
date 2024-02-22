import localFont from "next/font/local";
import Link from "next/link";
import { useState, useEffect } from "react";
const heading = localFont({ src: "../../public/fonts/Thin Fox.ttf" });

const content = [
  { title: "All", link: "/" },
  { title: "Tech", link: "/" },
  { title: "Movies", link: "/" },
  { title: "About", link: "/" },
  { title: "Contact", link: "/contact" },
];

const NavbarLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
      setIsPastThreshold(scrollPosition > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-16 transition-transform duration-500 ease-in z-50 bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 flex items-center justify-between ${
        isScrolled ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between px-10 gap-5 w-full ">
        <Link
          href="/"
          className="text-3xl font-semibold shimmer_subtitle "
          style={heading.style}
        >
          SmileScoop
        </Link>
        <div className="flex items-center justify-center gap-4">
          {content.map((item, i) => (
            <div className="  font-bold text-2xl cursor-pointer text-gray-200/65 ">
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavbarLanding;
