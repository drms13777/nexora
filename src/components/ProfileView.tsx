"use client";

import React from "react";
import { 
  ArrowLeft, Settings, RefreshCw, Cpu, Database, 
  Moon, Bell, Shield, Cloud, Info, ChevronRight, Edit3, User 
} from "lucide-react";

interface ProfileViewProps {
  onBack: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onBack, isDarkMode, toggleTheme }) => {
  // Динамические классы для темы
  const bgClass = isDarkMode ? "bg-[#121212] text-white" : "bg-[#F4F4F6] text-gray-900";
  const cardClass = isDarkMode ? "bg-[#1C1C1E] border-white/5" : "bg-white border-[#E2E8F0]";
  const btnClass = isDarkMode ? "bg-[#1C1C1E] border-white/10 text-white hover:bg-white/10" : "bg-white border-[#E2E8F0] text-gray-800 hover:bg-gray-100";
  const iconBgClass = isDarkMode ? "bg-white/5 text-gray-300" : "bg-[#F4F4F6] text-gray-700";
  const textPrimary = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondary = isDarkMode ? "text-gray-200" : "text-gray-800";
  const dividerClass = isDarkMode ? "border-white/10" : "border-gray-100";

  return (
    <div 
      className={`relative flex-1 overflow-y-auto overflow-x-hidden p-5 pb-12 select-none w-full transition-colors duration-300 ${bgClass}`}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Шапка профиля */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className={`p-2.5 rounded-full border transition shadow-sm active:scale-95 ${btnClass}`}
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className={`text-sm font-bold tracking-wide ${textPrimary}`}>Профиль</h2>
        <button className={`p-2.5 rounded-full border transition shadow-sm active:scale-95 ${btnClass}`}>
          <Settings size={18} />
        </button>
      </div>

      {/* Аватар и имя */}
      <div className="flex flex-col items-center mb-6">
        <div className={`relative w-24 h-24 rounded-full p-1 border shadow-sm mb-3 ${isDarkMode ? 'bg-[#1C1C1E] border-white/10' : 'bg-white border-[#E2E8F0]'}`}>
          <div className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
            <User size={40} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
          </div>
          <div className={`absolute bottom-0 right-0 w-7 h-7 rounded-full border-2 flex items-center justify-center shadow-sm ${isDarkMode ? 'bg-[#7C3AED] border-[#121212] text-white' : 'bg-gray-800 border-white text-white'}`}>
            <Edit3 size={12} />
          </div>
        </div>
        <h1 className={`text-lg font-bold ${textPrimary}`}>Пользователь</h1>
      </div>

      {/* Блок 1: Системные настройки */}
      <div className={`rounded-[16px] p-4 shadow-sm space-y-4 mb-4 border transition-colors duration-300 ${cardClass}`}>
        <div className={`flex items-center justify-between py-1 border-b pb-3 ${dividerClass}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-[10px] ${iconBgClass}`}>
              <RefreshCw size={18} />
            </div>
            <span className={`text-xs font-semibold ${textSecondary}`}>Синхронизация</span>
          </div>
          <span className="text-xs text-gray-500 font-medium">Отключено ●</span>
        </div>

        <div className={`flex items-center justify-between py-1 border-b pb-3 cursor-pointer hover:opacity-80 transition ${dividerClass}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-[10px] ${iconBgClass}`}>
              <Cpu size={18} />
            </div>
            <span className={`text-xs font-semibold ${textSecondary}`}>Модель ИИ</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>Секретный Deepseek API (локально)</span>
            <ChevronRight size={14} />
          </div>
        </div>

        <div className="flex items-center justify-between py-1 cursor-pointer hover:opacity-80 transition">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-[10px] ${iconBgClass}`}>
              <Database size={18} />
            </div>
            <span className={`text-xs font-semibold ${textSecondary}`}>База данных</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>MySQL</span>
            <ChevronRight size={14} />
          </div>
        </div>
      </div>

      {/* Блок 2: Настройки приложения */}
      <div className={`rounded-[16px] p-4 shadow-sm space-y-4 border transition-colors duration-300 ${cardClass}`}>
        
        <div 
          onClick={toggleTheme}
          className={`flex items-center justify-between py-1 border-b pb-3 cursor-pointer hover:opacity-80 transition ${dividerClass}`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-[10px] ${iconBgClass} text-[#7C3AED]`}>
              <Moon size={18} />
            </div>
            <span className={`text-xs font-semibold ${textSecondary}`}>Тема</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{isDarkMode ? "Темная" : "Светлая"}</span>
            {/* Визуальный ползунок */}
            <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${isDarkMode ? 'bg-[linear-gradient(145deg,var(--accent)_40%,var(--purple))]' : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${isDarkMode ? 'translate-x-4 shadow-sm' : 'translate-x-0 shadow-sm'}`} />
            </div>
          </div>
        </div>

        <div className={`flex items-center justify-between py-1 border-b pb-3 cursor-pointer hover:opacity-80 transition ${dividerClass}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-[10px] ${iconBgClass}`}>
              <Bell size={18} />
            </div>
            <span className={`text-xs font-semibold ${textSecondary}`}>Уведомления</span>
          </div>
          <ChevronRight size={14} className="text-gray-500" />
        </div>

        <div className={`flex items-center justify-between py-1 border-b pb-3 cursor-pointer hover:opacity-80 transition ${dividerClass}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-[10px] ${iconBgClass}`}>
              <Shield size={18} />
            </div>
            <span className={`text-xs font-semibold ${textSecondary}`}>Безопасность</span>
          </div>
          <ChevronRight size={14} className="text-gray-500" />
        </div>

        <div className={`flex items-center justify-between py-1 border-b pb-3 cursor-pointer hover:opacity-80 transition ${dividerClass}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-[10px] ${iconBgClass}`}>
              <Cloud size={18} />
            </div>
            <span className={`text-xs font-semibold ${textSecondary}`}>Резервные копии</span>
          </div>
          <ChevronRight size={14} className="text-gray-500" />
        </div>

        <div className="flex items-center justify-between py-1 cursor-pointer hover:opacity-80 transition">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-[10px] ${iconBgClass}`}>
              <Info size={18} />
            </div>
            <span className={`text-xs font-semibold ${textSecondary}`}>О приложении</span>
          </div>
          <ChevronRight size={14} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};