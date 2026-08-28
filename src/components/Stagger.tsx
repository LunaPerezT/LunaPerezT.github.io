import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A list whose items arrive one after another as it scrolls into view.
 *
 * Framer propagates variant *names* down the tree, so `Stagger.Item` needs no
 * animate prop of its own — it just declares what "hidden" and "visible" mean
 * for it. That keeps the two pieces independent: an item can live several
 * elements deep and still join the sequence.
 */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
  },
};

interface ListProps {
  children: React.ReactNode;
  className?: string;
  as?: "ul" | "ol" | "div";
}

function List({ children, className, as = "ul" }: ListProps) {
  const Component = motion[as];
  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {children}
    </Component>
  );
}

interface ItemProps {
  children: React.ReactNode;
  className?: string;
  as?: "li" | "div";
}

function Item({ children, className, as = "li" }: ItemProps) {
  const Component = motion[as];
  return (
    <Component variants={itemVariants} className={cn(className)}>
      {children}
    </Component>
  );
}

export const Stagger = { List, Item };
