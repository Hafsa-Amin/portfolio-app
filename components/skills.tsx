"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";

export default function Skills() {
  const { ref } = useSectionInView("Skills");
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * index,
      },
    }),
  };
  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>My skills</SectionHeading>
      <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
        {skillsData.map((skill, index) => (
            <motion.li 
            className="bg-white border border-black/10 rounded-xl px-5 py-3 dark:bg-white/10"
            key={index}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            variants={fadeInAnimationVariants}
            custom={index}
            >
              {skill}
            </motion.li>
          ))
        }
      </ul>
    </section>
  );
}