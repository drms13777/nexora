"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SplashScreen } from "@/components/SplashScreen";
import { CosmoBackground } from "@/components/CosmoBackground";
import { AuthScreen } from "@/components/AuthScreen";
import { GraphView } from "@/components/GraphView";
import { ProfileView } from "@/components/ProfileView";
import { BottomNav } from "@/components/BottomNav";
import { Search, ChevronRight, Folder, Paperclip, ArrowLeft, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_SPACES = [
  { id: "1", name: "Test" },
  { id: "2", name: "Учеба" },
  { id: "3", name: "Проекты" },
  { id: "4", name: "Работа" }, 
];

const hideScrollbar = "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";

export default function Home() {
  const [step, setStep] = useState<"splash" | "auth" | "transitioning" | "app">("splash");
  const [activeTab, setActiveTab] = useState<"main" | "notes" | "graph" | "chat" | "profile">("main");
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  
  // Управление модальными окнами
  const [modalType, setModalType] = useState<"none" | "note" | "quickNote" | "newSpace">("none");
  
  // Стейты для кастомного Select (Shadcn style) и валидации
  const [quickSpaceId, setQuickSpaceId] = useState<string>("");
  const [quickSpaceError, setQuickSpaceError] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleLoginSuccess = () => {
    setStep("transitioning");
    setTimeout(() => {
      setStep("app");
    }, 500);
  };

  const handleSaveNote = () => {
    if (modalType === "quickNote" && !quickSpaceId) {
      setQuickSpaceError(true);
      return;
    }
    setModalType("none");
    setQuickSpaceId("");
    setQuickSpaceError(false);
    setIsSelectOpen(false);
  };

  const closeModal = () => {
    setModalType("none");
    setQuickSpaceError(false);
    setQuickSpaceId("");
    setIsSelectOpen(false);
  };

  return (
    <main className={`relative min-h-screen w-full overflow-hidden font-sans select-none ${isDarkMode ? 'bg-[#121212]' : 'bg-[#F4F4F6]'}`}>
      {step === "splash" && <SplashScreen onComplete={() => setStep("auth")} />}
      {step === "app" && activeTab === "graph" && <CosmoBackground />}
      {step === "auth" && <AuthScreen onLoginSuccess={handleLoginSuccess} />}

      {step === "transitioning" && (
        <div className={`fixed inset-0 z-50 animate-fade-in duration-400 ${isDarkMode ? 'bg-[#121212]' : 'bg-[#F4F4F6]'}`} />
      )}

      {step === "app" && (
        <div
          className={`relative z-10 flex flex-col h-screen max-w-md mx-auto transition-colors duration-300 ${
            activeTab === "graph" ? "bg-transparent text-white" : isDarkMode ? "bg-[#121212] text-white" : "bg-transparent text-gray-900"
          }`}
        >
          {/* Шапка */}
          {activeTab !== "graph" && activeTab !== "profile" && (
            <header className="p-4 pt-8 flex flex-col gap-3 bg-transparent">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9">
                  <Image src="/logo.png" alt="Mind Vault Logo" fill className="object-contain" />
                </div>
                <div>
                  <h1 className="text-lg font-extrabold tracking-[0.1em] uppercase leading-none">
                    
                    <span className="text-[#5B21B6]">
                      Nexora
                    </span>
                  </h1>
                  <p className="text-[11px] text-gray-500 mt-0.5">Твоя База Знаний</p>
                </div>
              </div>

              {activeTab === "main" && (
                <div className="relative mt-1">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Спросите свою базу знаний..."
                    className={`w-full rounded-[14px] pl-10 pr-4 py-2.5 text-xs focus:outline-none border transition shadow-sm ${
                      isDarkMode 
                        ? 'bg-[#1C1C1E] text-white border-[#333333] focus:border-white' 
                        : 'bg-white text-gray-900 border-gray-300 focus:border-black'
                    }`}
                  />
                </div>
              )}
            </header>
          )}

          <div className="flex-1 relative overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
              
              {/* мейн*/}
              {activeTab === "main" && (
                <motion.div
                  key="main"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`flex-1 p-4 pb-28 flex flex-col gap-6 overflow-y-auto bg-transparent ${hideScrollbar}`}
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h2 className="text-lg font-bold">Пространства</h2>
                      <button 
                        onClick={() => { setSelectedSpace(null); setActiveTab("notes"); }} 
                        className="text-xs text-[#7C3AED] font-semibold hover:opacity-80 transition"
                      >
                        Все
                      </button>
                    </div>
                    
                    <div className={`rounded-[16px] border ${isDarkMode ? 'bg-[#1C1C1E] border-white/5' : 'bg-white border-[#E2E8F0]'} overflow-hidden`}>
                      {MOCK_SPACES.slice(0, 3).map((space) => (
                        <div 
                          key={space.id} 
                          onClick={() => { setSelectedSpace(space.id); setActiveTab("notes"); }}
                          className={`flex items-center justify-between p-4 cursor-pointer transition border-b last:border-0 ${isDarkMode ? 'hover:bg-white/5 border-white/5' : 'hover:bg-gray-50 border-gray-100'}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-[10px] ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                              <Folder size={18} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
                            </div>
                            <span className="font-medium text-sm">{space.name}</span>
                          </div>
                          <ChevronRight size={16} className="text-gray-400" />
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => setModalType("quickNote")}
                      style={{ background: 'linear-gradient(145deg, var(--accent) 40%, var(--purple))' }}
                      className="w-full mt-3 py-3 rounded-[12px] text-white text-sm font-semibold shadow-md active:scale-[0.98] transition"
                    >
                      + Быстрая заметка
                    </button>
                  </div>

                  {/* Недавнее */}
                  <div>
                    <h2 className="text-lg font-bold mb-2">Недавнее</h2>
                    <p className="text-xs text-gray-500 text-center py-6">
                      Здесь будут ваши последние редактируемые заметки
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Заметки */}
              {activeTab === "notes" && (
                <motion.div
                  key="notes"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`flex-1 flex flex-col p-4 pb-28 bg-transparent overflow-y-auto ${hideScrollbar}`}
                >
                  <AnimatePresence mode="wait">
                    {!selectedSpace ? (
                      <motion.div
                        key="spaces-list"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h2 className="text-2xl font-bold mb-1">Пространства</h2>
                        <p className="text-xs text-gray-500 mb-4">Заметки сгруппированы по пространствам.</p>
                        
                        <div className={`rounded-[16px] border ${isDarkMode ? 'bg-[#1C1C1E] border-white/5' : 'bg-white border-[#E2E8F0]'} overflow-hidden mb-4`}>
                          {MOCK_SPACES.map((space) => (
                            <div 
                              key={space.id} 
                              onClick={() => setSelectedSpace(space.id)}
                              className={`flex items-center justify-between p-4 cursor-pointer border-b last:border-0 transition ${isDarkMode ? 'hover:bg-white/5 border-white/5' : 'hover:bg-gray-50 border-gray-100'}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-[10px] ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                  <Folder size={18} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
                                </div>
                                <span className="font-medium text-sm">{space.name}</span>
                              </div>
                              <ChevronRight size={16} className="text-gray-400" />
                            </div>
                          ))}
                        </div>
                        <button 
                          onClick={() => setModalType("newSpace")}
                          style={{ background: 'linear-gradient(145deg, var(--accent) 40%, var(--purple))' }}
                          className="w-full py-3 rounded-[12px] text-white text-sm font-semibold active:scale-[0.98] transition"
                        >
                          + Новое пространство
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="space-detail"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 15 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col h-full"
                      >
                        <button 
                          onClick={() => setSelectedSpace(null)}
                          className="flex items-center gap-1 text-xs text-gray-400 mb-4 hover:text-[#7C3AED] w-fit transition"
                        >
                          <ArrowLeft size={14} /> К пространствам
                        </button>
                        
                        <h2 className="text-2xl font-bold mb-4">{MOCK_SPACES.find(s => s.id === selectedSpace)?.name}</h2>
                        
                        <div className="flex gap-2 mb-6">
                          <div className="relative flex-1">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                              type="text" 
                              placeholder="Поиск по заметкам" 
                              className={`w-full pl-9 pr-3 py-2.5 rounded-[12px] text-sm focus:outline-none transition border ${
                                isDarkMode 
                                  ? 'bg-[#1C1C1E] text-white border-[#333333] focus:border-white' 
                                  : 'bg-white text-gray-900 border-gray-300 focus:border-black'
                              }`}
                            />
                          </div>
                          <button 
                            onClick={() => setModalType("note")}
                            className={`px-4 font-semibold text-sm rounded-[12px] whitespace-nowrap active:scale-95 transition ${isDarkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-[#E9D5FF] text-[#5B21B6] hover:bg-purple-200'}`}
                          >
                            + Заметка
                          </button>
                        </div>

                        <div className={`flex-1 rounded-[16px] border p-4 ${isDarkMode ? 'bg-[#1C1C1E] border-white/5' : 'bg-white border-[#E2E8F0]'}`}>
                          <p className="text-gray-500 text-xs text-center mt-10">Пока нет заметок</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Графы */}
              {activeTab === "graph" && (
                <motion.div key="graph" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex-1 flex flex-col relative bg-transparent text-white">
                  <GraphView onBack={() => setActiveTab("main")} />
                </motion.div>
              )}

              {/* Профиль */}
              {activeTab === "profile" && (
                <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className={`flex-1 flex flex-col relative overflow-hidden bg-transparent ${hideScrollbar}`}>
                  <ProfileView onBack={() => setActiveTab("main")} isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
                </motion.div>
              )}

              {/* Чат */}
              {activeTab === "chat" && (
                <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 p-4 flex items-center justify-center text-gray-500 text-xs bg-transparent">
                  Раздел Чат
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {activeTab !== "graph" && activeTab !== "profile" && (
            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
          )}
        </div>
      )}

      {/* МОДАЛЬНЫЕ ОКНА */}
      <AnimatePresence>
        {/* МОДАЛКА ЗАМЕТОК (Обычная + Быстрая) */}
        {(modalType === "note" || modalType === "quickNote") && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed inset-0 z-50 flex flex-col ${isDarkMode ? "bg-[#121212]" : "bg-[#F4F4F6]"}`}
          >
            <div className="flex-1 flex flex-col max-w-md mx-auto w-full p-4">
              
              <div className="flex justify-between items-start mb-6 mt-4">
                <h2 className={`text-xl font-bold mt-1.5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Новая заметка</h2>
                
                
                {modalType === "quickNote" ? (
                  <div className="relative flex flex-col items-end z-50">
                    <button
                      type="button"
                      onClick={() => setIsSelectOpen(!isSelectOpen)}
                      className={`flex items-center justify-between gap-2 w-48 px-3 py-2 text-xs font-medium rounded-[10px] border transition-colors ${
                        isDarkMode 
                          ? 'bg-[#1C1C1E] text-white' 
                          : 'bg-white text-gray-900'
                      } ${
                        quickSpaceError 
                          ? 'border-red-500' 
                          : isSelectOpen
                            ? (isDarkMode ? 'border-white' : 'border-black')
                            : (isDarkMode ? 'border-[#333333] hover:border-gray-600' : 'border-gray-300 hover:border-gray-400')
                      }`}
                    >
                      <span className="truncate">
                        {quickSpaceId 
                          ? MOCK_SPACES.find(s => s.id === quickSpaceId)?.name 
                          : <span className="text-gray-400">Выберите пространство</span>}
                      </span>
                      <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isSelectOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {quickSpaceError && (
                      <span className="text-[10px] text-red-500 mt-1 font-medium">Обязательно выбрать</span>
                    )}
                    <AnimatePresence>
                      {isSelectOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsSelectOpen(false)} />
                          
                          <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.96 }}
                            transition={{ duration: 0.15 }}
                            className={`absolute right-0 top-10 w-48 p-1.5 rounded-[12px] border shadow-xl z-50 ${
                              isDarkMode 
                                ? 'bg-[#1C1C1E] border-[#333333] text-white shadow-black/60' 
                                : 'bg-white border-gray-200 text-gray-900 shadow-gray-200/80'
                            }`}
                          >
                            <div className="px-2.5 py-1.5 text-[10px] font-semibold text-gray-400">
                              Пространства
                            </div>
                            <div className="mt-0.5 space-y-0.5">
                              {MOCK_SPACES.map((s) => {
                                const isSelected = quickSpaceId === s.id;
                                return (
                                  <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => {
                                      setQuickSpaceId(s.id);
                                      setQuickSpaceError(false);
                                      setIsSelectOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-2.5 py-2 text-xs rounded-[8px] transition-colors ${
                                      isSelected 
                                        ? (isDarkMode ? 'bg-white/15 text-white font-semibold' : 'bg-gray-100 text-gray-900 font-semibold') 
                                        : (isDarkMode ? 'text-gray-300 hover:bg-white/10 hover:text-white' : 'text-gray-700 hover:bg-gray-50')
                                    }`}
                                  >
                                    <span>{s.name}</span>
                                    {isSelected && <Check size={14} className={isDarkMode ? "text-white" : "text-black"} />}
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <span className="text-xs text-gray-400 font-medium bg-gray-500/10 px-2.5 py-1 rounded-md mt-1.5">
                    {MOCK_SPACES.find(s => s.id === selectedSpace)?.name}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-4 flex-1">
                <div>
                  <label className="text-xs font-semibold text-gray-500 ml-1 mb-1.5 block">Заголовок</label>
                  <input 
                    type="text" 
                    placeholder="Название заметки"
                    className={`w-full p-3.5 rounded-[14px] border focus:outline-none transition ${
                      isDarkMode 
                        ? 'bg-[#1C1C1E] border-[#333333] text-white focus:border-white' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-black'
                    }`} 
                  />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <label className="text-xs font-semibold text-gray-500 ml-1 mb-1.5 block">Текст</label>
                  <textarea 
                    placeholder="Начните писать..."
                    className={`flex-1 w-full p-3.5 rounded-[14px] border resize-none focus:outline-none transition ${hideScrollbar} ${
                      isDarkMode 
                        ? 'bg-[#1C1C1E] border-[#333333] text-white focus:border-white' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-black'
                    }`} 
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-500/20 pb-2">
                <button className={`p-3 rounded-full transition active:scale-95 ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
                  <Paperclip size={20} />
                </button>
                
                <div className="flex gap-2">
                  <button 
                    onClick={closeModal}
                    className={`px-4 py-2.5 rounded-[12px] text-sm font-medium transition active:scale-95 ${isDarkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                  >
                    Отмена
                  </button>
                  <button 
                    onClick={handleSaveNote}
                    style={{ background: 'linear-gradient(145deg, var(--accent) 40%, var(--purple))' }}
                    className="px-5 py-2.5 rounded-[12px] text-white text-sm font-semibold active:scale-[0.98] transition shadow-md"
                  >
                    Сохранить
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
        
        {/* МОДАЛКА НОВОГО ПРОСТРАНСТВА */}
        {modalType === "newSpace" && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed inset-0 z-50 flex flex-col ${isDarkMode ? "bg-[#121212]" : "bg-[#F4F4F6]"}`}
          >
            <div className="flex-1 flex flex-col max-w-md mx-auto w-full p-4">
              
              <div className="flex justify-between items-center mb-6 mt-4">
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Новое пространство</h2>
              </div>

              <div className="flex flex-col gap-4 flex-1">
                <div>
                  <label className="text-xs font-semibold text-gray-500 ml-1 mb-1.5 block">Название</label>
                  <input 
                    type="text" 
                    placeholder="Например: Идеи для стартапа"
                    className={`w-full p-3.5 rounded-[14px] border focus:outline-none transition ${
                      isDarkMode 
                        ? 'bg-[#1C1C1E] border-[#333333] text-white focus:border-white' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-black'
                    }`} 
                  />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <label className="text-xs font-semibold text-gray-500 ml-1 mb-1.5 block">Описание</label>
                  <textarea 
                    placeholder="Пару слов о том, что будет храниться здесь..."
                    className={`flex-1 w-full p-3.5 rounded-[14px] border resize-none focus:outline-none transition ${hideScrollbar} ${
                      isDarkMode 
                        ? 'bg-[#1C1C1E] border-[#333333] text-white focus:border-white' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-black'
                    }`} 
                  />
                </div>
              </div>

              <div className="flex justify-end items-center mt-4 pt-4 border-t border-gray-500/20 pb-2">
                <div className="flex gap-2">
                  <button 
                    onClick={closeModal}
                    className={`px-4 py-2.5 rounded-[12px] text-sm font-medium transition active:scale-95 ${isDarkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                  >
                    Отмена
                  </button>
                  <button 
                    onClick={closeModal}
                    style={{ background: 'linear-gradient(145deg, var(--accent) 40%, var(--purple))' }}
                    className="px-5 py-2.5 rounded-[12px] text-white text-sm font-semibold active:scale-[0.98] transition shadow-md"
                  >
                    Создать
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}