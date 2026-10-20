"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  radius: number;
  baseAlpha: number;
  pulseSpeed: number;
  vx: number;
  vy: number;
}

export const CosmoBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Увеличенное количество звезд дальнего плана (180+) с высокой оптимизацией
    const starCount = Math.min(180, Math.floor((width * height) / 4500));
    const stars: Star[] = Array.from({ length: starCount }, () => {
      const z = Math.random() * 0.9 + 0.1;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        radius: z > 0.7 ? z * 1.2 : z * 0.7 + 0.2, // Уменьшенные аккуратные звезды
        baseAlpha: z * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.015 + 0.003,
        vx: (Math.random() - 0.5) * z * 0.08, // Скорость уменьшена
        vy: (Math.random() - 0.5) * z * 0.08, // Скорость уменьшена
      };
    });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    let time = 0;
    const render = () => {
      time += 1;

      const bgGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      bgGradient.addColorStop(0, "#0a1330");
      bgGradient.addColorStop(0.5, "#040818");
      bgGradient.addColorStop(1, "#010206");

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const currentAlpha =
          star.baseAlpha + Math.sin(time * star.pulseSpeed) * 0.25;

        // Уменьшенный неон вокруг крупных звезд
        if (star.z > 0.75) {
          const glowGrad = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            star.radius * 2.2 // Уменьшено с 4.5 до 2.2
          );
          glowGrad.addColorStop(0, `rgba(180, 215, 255, ${currentAlpha * 0.35})`);
          glowGrad.addColorStop(1, "rgba(180, 215, 255, 0)");

          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, Math.max(0, currentAlpha))})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none w-full h-full"
    />
  );
};