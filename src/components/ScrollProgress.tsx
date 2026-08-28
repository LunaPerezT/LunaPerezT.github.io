import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A hairline that tracks reading position, pinned under the header.
 *
 * `scaleX` on a transform is compositor-only, so this costs nothing per frame,
 * and the spring keeps it from twitching on trackpad scroll. Decorative: the
 * page has real landmarks for anyone who cannot see it.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-0 h-px origin-left bg-primary"
    />
  );
}
