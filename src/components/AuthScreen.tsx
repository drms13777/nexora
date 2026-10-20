"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthScreenProps {
  onLoginSuccess: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<"welcome" | "login" | "register">("welcome");
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      if (mode === "register" && !name.trim()) return;
      onLoginSuccess();
    }
  };

  return (
    <div className="relative z-10 min-h-screen w-full bg-[#F4F4F6] flex flex-col justify-between p-6 max-w-md mx-auto text-gray-900 overflow-hidden">
      
      <AnimatePresence mode="wait">
        {mode === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col justify-between py-12 text-center relative z-10"
          >
            <div className="pt-8">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <Image
                  src="/logo.png"
                  alt="MindVault Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-3xl font-extrabold tracking-[0.15em] uppercase text-gray-900">
                <span className="text-[#5B21B6]">Nexora</span>
              </h1>
              <p className="text-gray-500 text-xs mt-3 max-w-xs mx-auto leading-relaxed">
                База знаний с умными заметками.
              </p>
            </div>

            <div className="space-y-3 pb-6 w-full">
              <button
                onClick={() => setMode("login")}
                className="w-full h-[52px] bg-[#5B21B6] hover:bg-[#4C1D95] text-white font-semibold rounded-[16px] shadow-md shadow-[#5B21B6]/20 transition-all active:scale-[0.98] text-sm tracking-wide"
              >
                Войти
              </button>
              <button
                onClick={() => setMode("register")}
                className="w-full h-[52px] bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-[16px] border border-[#E2E8F0] shadow-sm transition-all active:scale-[0.98] text-sm"
              >
                Создать аккаунт
              </button>
            </div>
          </motion.div>
        )}

        {(mode === "login" || mode === "register") && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col justify-between py-8 relative z-10"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => setMode("welcome")}
                  className="p-2.5 rounded-full bg-white border border-[#E2E8F0] text-gray-800 hover:bg-gray-100 transition shadow-sm active:scale-95"
                >
                  <ArrowLeft size={18} />
                </button>
                <h2 className="text-lg font-bold text-gray-900">
                  {mode === "register" ? "Регистрация" : "Авторизация"}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "register" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Имя пользователя
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Введите ваше имя"
                      required
                      className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-[14px] focus:outline-none focus:border-[#5B21B6] text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-all"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Почта / Имя пользователя
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Почта"
                    required
                    className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-[14px] focus:outline-none focus:border-[#5B21B6] text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Пароль
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-[14px] focus:outline-none focus:border-[#5B21B6] text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {mode === "login" && (
                    <div className="text-right mt-2">
                      <a href="#" className="text-xs text-[#5B21B6] hover:underline font-semibold">
                        Забыли пароль?
                      </a>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full h-[52px] bg-[#5B21B6] hover:bg-[#4C1D95] text-white font-semibold rounded-[16px] shadow-md shadow-[#5B21B6]/20 transition-all active:scale-[0.98] text-sm tracking-wide mt-4"
                >
                  {mode === "register" ? "Зарегистрироваться" : "Войти"}
                </button>
              </form>
            </div>

            <div className="text-center pt-6">
              <p className="text-xs text-gray-500">
                {mode === "register" ? "Уже есть аккаунт? " : "Нет аккаунта? "}
                <button
                  onClick={() => setMode(mode === "register" ? "login" : "register")}
                  className="font-bold text-[#5B21B6] hover:underline"
                >
                  {mode === "register" ? "Войти" : "Зарегистрироваться"}
                </button>
              </p>
              <p className="text-[10px] text-gray-400 mt-4"></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};