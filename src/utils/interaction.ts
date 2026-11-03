/**
 * SkillSync AI 4.0 - Interaction Design & Kinetic Typography Utilities
 * Inspired by reference site (siddhibhavya.pages.dev) micro-interactions,
 * kinetic typography, and motion physics.
 */

export interface SplitCharNode {
  char: string;
  index: number;
  isSpace: boolean;
}

export interface SplitWordNode {
  word: string;
  index: number;
  chars: SplitCharNode[];
}

/**
 * Splits a text string into accessible word and character structures
 * for kinetic text reveals while preserving complete screen-reader accessibility.
 */
export function splitTextForKineticReveal(text: string): SplitWordNode[] {
  if (!text) return [];

  const words = text.split(/(\s+)/);
  let globalCharIndex = 0;

  return words
    .filter((w) => w.length > 0)
    .map((word, wordIdx) => {
      const isWhitespace = /^\s+$/.test(word);
      const chars: SplitCharNode[] = Array.from(word).map((char) => ({
        char,
        index: globalCharIndex++,
        isSpace: isWhitespace || char === ' ',
      }));

      return {
        word,
        index: wordIdx,
        chars,
      };
    });
}

/**
 * Reference cubic-bezier easing curve from siddhibhavya.pages.dev
 * --ease-out: cubic-bezier(0.22, 1, 0.36, 1)
 */
export const REFERENCE_EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Spring configuration for snappy micro-interactions (buttons, cards, hover lift)
 */
export const SPRING_MICRO_CONFIG = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
  mass: 0.8,
} as const;

/**
 * Smooth cinematic page transition variants
 */
export const CINEMATIC_TRANSITION_VARIANTS = {
  initial: {
    opacity: 0,
    y: 12,
    scale: 0.995,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.995,
    transition: {
      duration: 0.2,
      ease: [0.36, 0, 0.66, -0.56] as const,
    },
  },
};

/**
 * Checks if user prefers reduced motion safely across browser and SSR/test environments.
 */
export function checkPrefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Checks if current device relies primarily on touch (coarse pointer)
 */
export function checkIsTouchDevice(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }
  return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
}
