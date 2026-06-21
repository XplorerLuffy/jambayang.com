"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

type ScrollSectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tiltDeg?: number;
  scaleFrom?: number;
  yFrom?: number;
};

export default function ScrollSection({
  children,
  className,
  id,
  tiltDeg = 6,
  scaleFrom = 0.92,
  yFrom = 60,
}: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 40%"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [tiltDeg, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [scaleFrom, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [yFrom, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (reduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{
        rotateX,
        scale,
        y,
        opacity,
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
