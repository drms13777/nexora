"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, ChevronRight, ArrowLeft, Paperclip } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [step, setStep] = useState<"splash" | "auth" | "transitioning" | "app">("splash");
  const [activeTab, setActiveTab] = useState<"main" | "notes" | "graph" | "chat" | "profile">("main");
  const [isDarkMode, setIsDarkMode] = useState(true); 
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const bgClass = isDarkMode ? "bg-[#121212] text-white" : "bg-[#F4F4F6] text-gray-900";
  const cardClass = isDarkMode ? "bg-[#1C1C1E] border-white/5" : "bg-white border-[#E2E8F0]";

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center text-center ${bgClass}`}>
      <h1 className="text-3xl font-bold mb-2">Nexora</h1>
      <p className="opacity-80">Каркас приложения. Экраны появятся в следующих задачах.</p>
    </main>
  );
};



