"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

type Props = {
  children: JSX.Element;
  width?: "fit-content" | "100%";
};

const RevealUp = ({ children, width = "fit-content" }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div ref={ref} style={{ width }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 10,
            transition: { staggerChildren: 0.2 }, // Adjust stagger duration here
          },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{
          duration: 0.08, // Total duration for each element's animation
          delay: 0.12,
          ease: "ease-out",
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 10,
              transition: { duration: 0.5 }, // Duration for each element's animation
            },
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RevealUp;
