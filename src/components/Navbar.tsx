// Navbar.tsx
import { useState, useEffect } from "react";

const content = [
  { title: "all", link: "/" },
  { title: "tech", link: "/" },
  { title: "movies", link: "/" },
  { title: "About", link: "/" },
  { title: "Contact", link: "/" },
];

const Navbar = () => {
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
      className={`fixed top-0 left-0 w-full h-16 bg-green-300 transition-transform duration-700 ease-in z-50 ${
        isScrolled ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-center gap-5">
        {content.map((item, i) => (
          <div>{item.title}</div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
