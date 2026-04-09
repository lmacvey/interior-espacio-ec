import type { Variants, Transition } from "framer-motion";

export const transitions = {
  gentle: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } as Transition,
  smooth: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } as Transition,
  micro:  { duration: 0.15, ease: "easeOut" } as Transition,
};

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: transitions.gentle },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: transitions.gentle },
};

export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const staggerContainerSlow: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: transitions.smooth },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: transitions.smooth },
};

/** Use with AnimatePresence for the mobile nav menu */
export const mobileMenu: Variants = {
  hidden:  { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.25, ease: "easeOut" } },
  exit:    { opacity: 0, height: 0, transition: { duration: 0.2, ease: "easeIn" } },
};
