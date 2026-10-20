"use client";

import React from "react";
import { 
  ArrowLeft, Settings, RefreshCw, Cpu, Database, 
  Moon, Bell, Shield, Cloud, Info, ChevronRight, Edit3 
} from "lucide-react";

interface ProfileViewProps {
  onBack: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onBack }) => {
  return (
    <div 
      className="relative flex-1 overflow-y-auto overflow-x-hidden p-5 pb-12 text-gray-900 select-none w-full bg-[#F4F4F6]"
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
          className="p-2.5 rounded-full bg-white border border-[#E2E8F0] text-gray-800 hover:bg-gray-100 transition shadow-sm active:scale-95"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-sm font-bold text-gray-900 tracking-wide">Профиль</h2>
        <button className="p-2.5 rounded-full bg-white border border-[#E2E8F0] text-gray-800 hover:bg-gray-100 transition shadow-sm active:scale-95">
          <Settings size={18} />
        </button>
      </div>

      {/* Аватар и имя */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-24 h-24 rounded-full p-1 bg-white border border-[#E2E8F0] shadow-sm mb-3">
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            <span className="text-3xl text-gray-600">👤</span>
          </div>
          <div className="absolute bottom-0 right-0 w-7 h-7 bg-gray-800 text-white rounded-full border-2 border-white flex items-center justify-center shadow-sm">
            <Edit3 size={12} />
          </div>
        </div>
        <h1 className="text-lg font-bold text-gray-900">Пользователь</h1>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-4 shadow-sm space-y-4 mb-4">
        <div className="flex items-center justify-between py-1 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-[10px] bg-[#F4F4F6] text-gray-700">
              <RefreshCw size={18} />
            </div>
            <span className="text-xs font-semibold text-gray-800">Синхронизация</span>
          </div>
          <span className="text-xs text-gray-400 font-medium">Отключено ●</span>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-gray-100 pb-3 cursor-pointer hover:opacity-80 transition">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-[10px] bg-[#F4F4F6] text-gray-700">
              <Cpu size={18} />
            </div>
            <span className="text-xs font-semibold text-gray-800">Модель ИИ</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>Секретный Deepseek API (локально)</span>
            <ChevronRight size={14} />
          </div>
        </div>

        <div className="flex items-center justify-between py-1 cursor-pointer hover:opacity-80 transition">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-[10px] bg-[#F4F4F6] text-gray-700">
              <Database size={18} />
            </div>
            <span className="text-xs font-semibold text-gray-800">База данных</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>MySQL</span>
            <ChevronRight size={14} />
          </div>
        </div>
      </div>

      {/* Блок 2: Настройки приложения */}
      <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-4 shadow-sm space-y-4">
        <div className="flex items-center justify-between py-1 border-b border-gray-100 pb-3 cursor-pointer hover:opacity-80 transition">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-[10px] bg-[#F4F4F6] text-gray-700">
              <Moon size={18} />
            </div>
            <span className="text-xs font-semibold text-gray-800">Тема</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>Светлая</span>
            <ChevronRight size={14} />
          </div>
        </div>

        <div className="flex items-center justify-between py-1 border-b border-gray-100 pb-3 cursor-pointer hover:opacity-80 transition">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-[10px] bg-[#F4F4F6] text-gray-700">
              <Bell size={18} />
            </div>
            <span className="text-xs font-semibold text-gray-800">Уведомления</span>
          </div>
          <ChevronRight size={14} className="text-gray-400" />
        </div>

        <div className="flex items-center justify-between py-1 border-b border-gray-100 pb-3 cursor-pointer hover:opacity-80 transition">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-[10px] bg-[#F4F4F6] text-gray-700">
              <Shield size={18} />
            </div>
            <span className="text-xs font-semibold text-gray-800">Безопасность</span>
          </div>
          <ChevronRight size={14} className="text-gray-400" />
        </div>

        <div className="flex items-center justify-between py-1 border-b border-gray-100 pb-3 cursor-pointer hover:opacity-80 transition">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-[10px] bg-[#F4F4F6] text-gray-700">
              <Cloud size={18} />
            </div>
            <span className="text-xs font-semibold text-gray-800">Резервные копии</span>
          </div>
          <ChevronRight size={14} className="text-gray-400" />
        </div>

        <div className="flex items-center justify-between py-1 cursor-pointer hover:opacity-80 transition">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-[10px] bg-[#F4F4F6] text-gray-700">
              <Info size={18} />
            </div>
            <span className="text-xs font-semibold text-gray-800">О приложении</span>
          </div>
          <ChevronRight size={14} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};