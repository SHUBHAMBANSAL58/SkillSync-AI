import React, { useEffect, useState, useRef } from 'react';
import { checkPrefersReducedMotion, checkIsTouchDevice } from '../../utils/interaction';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Target and current interpolated coordinates for silky 60fps tracking
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch devices or if reduced motion is requested
    if (checkIsTouchDevice() || checkPrefersReducedMotion()) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
      }

      // Check if hovering an interactive target
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = !!target.closest(
          'button, a, input, select, textarea, [role="button"], [cursor="pointer"], .cursor-pointer'
        );
        setIsPointer(isInteractive);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth Lerp animation loop
    const renderLoop = () => {
      // Lerp ring towards mouse position (factor 0.22)
      ring.current.x += (mouse.current.x - ring.current.x) * 0.22;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden" aria-hidden="true">
      {/* Outer interactive follower ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-4 -mt-4 rounded-full transition-[width,height,background-color,border-color,opacity] duration-200 ease-out will-change-transform ${
          isPointer
            ? 'w-10 h-10 border border-indigo-400 bg-indigo-500/15 shadow-[0_0_20px_rgba(99,102,241,0.4)]'
            : isClicking
            ? 'w-7 h-7 border border-purple-400/80 bg-purple-500/20'
            : 'w-8 h-8 border border-indigo-400/40 bg-indigo-500/5'
        }`}
      />

      {/* Center pinpoint indicator */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full will-change-transform transition-[transform,background-color] duration-100 ease-out ${
          isPointer ? 'bg-cyan-300 scale-125 shadow-[0_0_8px_#67e8f9]' : 'bg-indigo-300'
        }`}
      />
    </div>
  );
};
