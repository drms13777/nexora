"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeState("out");
    }, 2000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-700 ${
        fadeState === "in" ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative w-20 h-20 mb-6 animate-pulse">
        <Image
          src="/logo.png"
          alt="Mind Vault Logo"
          fill
          className="object-contain"
        />
      </div>
      <h1 className="text-3xl font-extrabold text-white tracking-[0.2em] uppercase font-onest">
        Nexora
      </h1>
    </div>
  );
};