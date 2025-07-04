'use client';

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useRef } from "react";
import { useInView } from "framer-motion";

interface MotionProps {
  children: ReactNode;
  className?: string;
  keyProp?: string | number;
  triggerOnce?: boolean;
  disableInView?: boolean;
}

export default function Motion({
  children,
  keyProp,
  className,
  triggerOnce = true,
  disableInView = false, 
}: MotionProps) {
  const ref = useRef(null);
  const isInView = triggerOnce
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ? useInView(ref, { once: true, margin: "-100px" })
    : true;

  const shouldAnimate = disableInView ? true : isInView;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={ref}
        key={keyProp ?? "default"}
        initial={{ opacity: 0, y: 30 }}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className={`w-full ${className ?? ""}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
