import React, { useEffect, useRef } from 'react';
import { checkPrefersReducedMotion } from '../../utils/interaction';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  hue: number;
}

export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isReduced = checkPrefersReducedMotion();

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', onResize);

    // Mouse coordinates for gentle parallax interaction
    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Initialize 45 celestial nodes
    const particleCount = Math.min(50, Math.floor((width * height) / 28000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.45 + 0.15,
        alpha: Math.random() * 0.45 + 0.15,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.6 ? 240 : 210, // Indigo & cyan
      });
    }

    let animId: number;

    const render = () => {
      // Ease mouse coordinates for silky parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Subtle ambient gradient background glow
      const parallaxOffsetX = (mouse.x - width / 2) * 0.02;
      const parallaxOffsetY = (mouse.y - height / 2) * 0.02;

      // Draw constellation connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        if (!isReduced) {
          p1.x += p1.vx;
          p1.y += p1.vy;

          // Wrap edges
          if (p1.x < 0) p1.x = width;
          if (p1.x > width) p1.x = 0;
          if (p1.y < 0) p1.y = height;
          if (p1.y > height) p1.y = 0;

          // Twinkle
          p1.twinklePhase += p1.twinkleSpeed;
          p1.alpha = p1.baseAlpha + Math.sin(p1.twinklePhase) * 0.18;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(
          p1.x + parallaxOffsetX,
          p1.y + parallaxOffsetY,
          p1.radius,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `hsla(${p1.hue}, 85%, 75%, ${Math.max(0.05, p1.alpha)})`;
        ctx.fill();

        // Connect nearby nodes (distance < 110px)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x + parallaxOffsetX, p1.y + parallaxOffsetY);
            ctx.lineTo(p2.x + parallaxOffsetX, p2.y + parallaxOffsetY);
            ctx.strokeStyle = `rgba(129, 140, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      if (!document.hidden) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    const onVisibilityChange = () => {
      if (!document.hidden) {
        animId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      aria-hidden="true"
    />
  );
};
