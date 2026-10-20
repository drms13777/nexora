"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SplashScreen } from "@/components/SplashScreen";
import { CosmoBackground } from "@/components/CosmoBackground";
import { AuthScreen } from "@/components/AuthScreen";
import { GraphView } from "@/components/GraphView";
import { ProfileView } from "@/components/ProfileView";
import { BottomNav } from "@/components/BottomNav";
import { Search, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [step, setStep] = useState<"splash" | "auth" | "transitioning" | "app">("splash");
  const [activeTab, setActiveTab] = useState<"main" | "notes" | "graph" | "chat" | "profile">("main");

  const handleLoginSuccess = () => {
    setStep("transitioning");
    setTimeout(() => {
      setStep("app");
    }, 500);
  };

  return (
    <main className="relative min-h-screen w-full bg-[#F4F4F6] overflow-hidden font-sans select-none">
      {/* 1. Splash Screen */}
      {step === "splash" && (
        <SplashScreen onComplete={() => setStep("auth")} />
      )}

      {/* 2. Динамический Космо-фон для раздела Граф */}
      {step === "app" && activeTab === "graph" && (
        <CosmoBackground />
      )}

      {/* 3. Экран Авторизации */}
      {step === "auth" && <AuthScreen onLoginSuccess={handleLoginSuccess} />}

      {/* 4. Переход между экранами */}
      {step === "transitioning" && (
        <div className="fixed inset-0 z-50 bg-[#F4F4F6] animate-fade-in duration-400" />
      )}

      {/* 5. Главный интерфейс */}
      {step === "app" && (
        <div
          className={`relative z-10 flex flex-col h-screen max-w-md mx-auto transition-colors duration-300 ${
            activeTab === "graph" 
              ? "bg-transparent text-white" 
              : "bg-[#F4F4F6] text-gray-900"
          }`}
        >
          {/* Шапка с премиальной типографикой (скрыта в Графе и Профиле) */}
          {activeTab !== "graph" && activeTab !== "profile" && (
            <header className="p-4 pt-8 flex flex-col gap-3 bg-[#F4F4F6]">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9">
                  <Image
                    src="/logo.png"
                    alt="Mind Vault Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-lg font-extrabold tracking-[0.1em] uppercase leading-none text-gray-900">
                    <span className="text-[#5B21B6]">Nexora</span>
                  </h1>
                  <p className="text-[11px] text-gray-500 mt-0.5">Твоя База Знаний</p>
                </div>
              </div>

              {activeTab === "main" && (
                <div className="relative mt-1">
                  <Search
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Спросите свою базу знаний..."
                    className="w-full rounded-[14px] pl-10 pr-4 py-2.5 text-xs focus:outline-none border bg-white text-gray-900 border-[#E2E8F0] focus:border-[#5B21B6] transition shadow-sm"
                  />
                </div>
              )}
            </header>
          )}

          {/* Контент вкладок */}
          <div className="flex-1 relative overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
              {activeTab === "main" && (
                <motion.div
                  key="main"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 p-4 pb-28 flex flex-col gap-3.5 overflow-y-auto bg-[#F4F4F6]"
                >
                  
                  <div className="bg-white text-gray-900 rounded-[16px] p-4 flex items-center justify-between shadow-sm border border-[#E2E8F0]">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-12 h-12 rounded-[12px] overflow-hidden border border-gray-200 flex-shrink-0">
                        <Image
                          src="/mem2.jpg"
                          alt="Мемность"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold tracking-wide text-gray-900">Мемность</h3>
                        <p className="text-[11px] text-[#5B21B6] font-semibold mt-0.5">Увлечения • #пикчи</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition p-2">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  
                  <div className="bg-white text-gray-900 rounded-[16px] p-4 flex items-center justify-between shadow-sm border border-[#E2E8F0]">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-12 h-12 rounded-[12px] overflow-hidden border border-gray-200 flex-shrink-0">
                        <Image
                          src="/mem1.jpg"
                          alt="Алгем дз"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold tracking-wide text-gray-900">Алгем дз</h3>
                        <p className="text-[11px] text-gray-500 font-medium mt-0.5">Конспекты • #алгебра #дз</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition p-2">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === "graph" && (
                <motion.div
                  key="graph"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 flex flex-col relative bg-transparent text-white"
                >
                  <GraphView onBack={() => setActiveTab("main")} />
                </motion.div>
              )}

              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 flex flex-col relative overflow-hidden bg-[#F4F4F6]"
                >
                  <ProfileView onBack={() => setActiveTab("main")} />
                </motion.div>
              )}

              {activeTab === "notes" && (
                <motion.div
                  key="notes"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 p-4 flex items-center justify-center text-gray-500 text-xs bg-[#F4F4F6]"
                >
                  Раздел Заметки
                </motion.div>
              )}

              {activeTab === "chat" && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 p-4 flex items-center justify-center text-gray-500 text-xs bg-[#F4F4F6]"
                >
                  Раздел Чат
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Нижняя навигация скрывается в Графе и Профиле */}
          {activeTab !== "graph" && activeTab !== "profile" && (
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
          )}
        </div>
      )}
    </main>
  );
};