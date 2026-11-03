import React from 'react';
import { motion } from 'motion/react';
import { splitTextForKineticReveal, REFERENCE_EASE_OUT, checkPrefersReducedMotion } from '../../utils/interaction';

interface KineticTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  staggerDelay?: number;
  initialDelay?: number;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  className = '',
  as = 'h2',
  staggerDelay = 0.025,
  initialDelay = 0.05,
}) => {
  const isReducedMotion = typeof window !== 'undefined' && checkPrefersReducedMotion();
  const words = splitTextForKineticReveal(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isReducedMotion ? 0 : staggerDelay,
        delayChildren: isReducedMotion ? 0 : initialDelay,
      },
    },
  };

  const charVariants = {
    hidden: {
      opacity: isReducedMotion ? 1 : 0,
      y: isReducedMotion ? 0 : 16,
      rotateZ: isReducedMotion ? 0 : -2,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      transition: {
        duration: isReducedMotion ? 0 : 0.45,
        ease: REFERENCE_EASE_OUT,
      },
    },
  };

  const Component = as as React.ElementType;

  return (
    <Component className={`relative inline-block ${className}`} aria-label={text}>
      <motion.span
        className="inline-flex flex-wrap items-baseline gap-x-[0.25em]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
      >
        {words.map((w, wIdx) => {
          if (w.word.trim().length === 0) {
            return (
              <span key={`space-${wIdx}`} className="inline-block whitespace-pre">
                {' '}
              </span>
            );
          }

          return (
            <span key={`word-${wIdx}`} className="inline-flex whitespace-nowrap">
              {w.chars.map((c) => (
                <motion.span
                  key={`char-${c.index}`}
                  variants={charVariants}
                  className="inline-block transform-gpu"
                >
                  {c.char}
                </motion.span>
              ))}
            </span>
          );
        })}
      </motion.span>
    </Component>
  );
};
