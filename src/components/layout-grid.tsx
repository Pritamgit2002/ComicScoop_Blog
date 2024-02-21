"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { cn } from "../../utils/cn";
import { urlFor } from "@/app/lib/sanity";
import { GiCancel } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";
import "../styles/styles.css";

type Card = {
  id: number;
  title: JSX.Element | React.ReactNode | string;
  titleImage: string;
  smallDescription: string;
  currentSlug: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const mainControls = useAnimation();
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };
  const handleClick = (card: Card) => {
    if (selected?.id === card.id) {
      handleOutsideClick();
    } else {
      setLastSelected(selected);
      setSelected(card);
    }
  };

  return (
    <motion.div
      className="w-full pt-20 pb-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl bg-black gap-4 mx-auto overflow-y-auto min-h-screen h-max place-content-center  "
      initial={{
        opacity: 0.9,
        y: 100,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.95,
        ease: "easeInOut",
      }}
    >
      {cards.map((card, i) => (
        <div
          key={i}
          className={`${i % 3 === 0 ? "md:col-span-2" : "col-span-1"} h-80 `}
        >
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              "relative overflow-hidden select-none ",
              selected?.id === card.id
                ? "rounded-lg cursor-pointer absolute inset-x-0 inset-y-auto bg-green-500 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col border-2 border-gray-200 shadow-md shadow-gray-300 "
                : lastSelected?.id === card.id
                ? "z-40 bg-white rounded-xl h-full w-full"
                : "bg-white rounded-xl h-full w-full"
            )}
            layout
          >
            {selected?.id === card.id && (
              <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 100,
                  }}
                  animate={{
                    opacity: 1,
                    y: -50,
                  }}
                  transition={{
                    duration: 0.95,
                    ease: "easeInOut",
                  }}
                  className="relative px-8 pb-4 z-[70] text-white flex items-center justify-between  "
                >
                  <div className="w-2/3 flex flex-col items-start justify-start gap-y-5 ">
                    <span className=" text-4xl font-bold ">
                      {selected?.title}
                    </span>
                    <p className=" font-medium ">
                      {selected?.smallDescription}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${card.currentSlug}`}
                    target="_blank"
                    className="text-2xl text-white active:text-gray-300/90 active:scale-90 duration-100 ease-in "
                  >
                    <FaExternalLinkAlt />
                  </Link>
                </motion.div>
              </div>
            )}
            <div className="  ">
              <Image
                src={urlFor(card.titleImage).url()}
                height="500"
                width="500"
                onLoad={() => setLoaded(true)}
                className={cn(
                  " object-cover object-top absolute inset-0 h-full w-full transition duration-150 ",
                  loaded ? "blur-none  " : " blur-xl grayscale "
                )}
                alt="titleImage"
              />
              <span className="text-3xl absolute font-bold text-white w-full h-full flex items-end pb-4 pl-5  ">
                {card.title}
              </span>
            </div>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
};
