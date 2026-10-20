"use client";

import React from "react";
import { Home, FileText, Share2, MessageSquare, User } from "lucide-react";
import { motion } from "framer-motion";

interface BottomNavProps {
  activeTab: "main" | "notes" | "graph" | "chat" | "profile";
  onTabChange: (tab: "main" | "notes" | "graph" | "chat" | "profile") => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "main", label: "Главная", icon: Home },
    { id: "notes", label: "Заметки", icon: FileText },
    { id: "graph", label: "Граф", icon: Share2 },
    { id: "chat", label: "Чат", icon: MessageSquare },
    { id: "profile", label: "Профиль", icon: User },
  ] as const;

  return (
    <div className="absolute bottom-5 left-4 right-4 z-40 max-w-sm mx-auto">
      <div className="bg-[#12153b]/85 backdrop-blur-2xl border border-purple-500/30 rounded-[26px] px-3 py-2 flex justify-around items-center shadow-[0_8px_32px_rgba(35,41,119,0.4)]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center py-1.5 px-3 transition-colors ${
                isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <Icon size={18} />
              <span className="text-[9px] mt-0.5 font-medium">{tab.label}</span>

              {/* Фирменная фиолетовая полоска активного раздела */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 w-5 h-[2.5px] bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                  transition={{ type: "spring", stiffness: 600, damping: 25 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};