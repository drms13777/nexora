"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ChevronDown, Plus, Minus, Target } from "lucide-react";

interface Node {
  id: string;
  label: string;
  relX: number;
  relY: number;
  category: "study" | "projects" | "people" | "hobbies" | "journal" | "me";
  color: string;
  description: string;
  tags: string[];
  parentId?: string;
}

interface GraphViewProps {
  onBack: () => void;
}

const RAW_NODES: Omit<Node, "x" | "y">[] = [
  {
    id: "me",
    label: "Я",
    relX: 0,
    relY: 0,
    category: "me",
    color: "#ffffff",
    description: "Центр вашей базы знаний. Связывает все аспекты жизни и проектов.",
    tags: ["Конспекты", "Профиль", "Люди", "Увлечения"],
  },

  {
    id: "study",
    label: "Конспекты",
    relX: -140,
    relY: -150,
    category: "study",
    color: "#60a5fa",
    description: "Учебные записи, термины и базы лекций.",
    tags: ["Учёба", "Лекции", "Математика"],
    parentId: "me",
  },
  {
    id: "projects",
    label: "Проекты",
    relX: 150,
    relY: -140,
    category: "projects",
    color: "#c084fc",
    description: "Идеи приложений, архитектура и кодовая база.",
    tags: ["MindVault", "Next.js", "AI-Engine"],
    parentId: "me",
  },
  {
    id: "hobbies",
    label: "Увлечения",
    relX: -160,
    relY: 130,
    category: "hobbies",
    color: "#34d399",
    description: "Хобби, музыка, книги и спорт.",
    tags: ["Музыка", "Гитара", "Тренировки"],
    parentId: "me",
  },
  {
    id: "people",
    label: "Люди",
    relX: 160,
    relY: 140,
    category: "people",
    color: "#fbbf24",
    description: "Контакты, важные даты и идеи подарков.",
    tags: ["Семья", "Друзья", "Коллеги"],
    parentId: "me",
  },
  {
    id: "journal",
    label: "Дневник",
    relX: 0,
    relY: 200,
    category: "journal",
    color: "#38bdf8",
    description: "Ежедневные записи, цели и рефлексия.",
    tags: ["Итоги", "Цели 2026"],
    parentId: "me",
  },


  { id: "s1", label: "Алгоритмы", relX: -240, relY: -220, category: "study", color: "#60a5fa", description: "Структуры данных.", tags: ["CS"], parentId: "study" },
  { id: "s2", label: "ИИ и Нейросети", relX: -100, relY: -260, category: "study", color: "#60a5fa", description: "Transformers.", tags: ["ML"], parentId: "study" },

  { id: "p1", label: "MindVault UI", relX: 260, relY: -210, category: "projects", color: "#c084fc", description: "Дизайн-система.", tags: ["UI/UX"], parentId: "projects" },
  { id: "p2", label: "Backend API", relX: 250, relY: -70, category: "projects", color: "#c084fc", description: "База данных.", tags: ["NodeJS"], parentId: "projects" },

  { id: "h1", label: "Фотография", relX: -270, relY: 110, category: "hobbies", color: "#34d399", description: "Пейзажи.", tags: ["Foto"], parentId: "hobbies" },
  { id: "h2", label: "Спортзалы", relX: -220, relY: 230, category: "hobbies", color: "#34d399", description: "Тренировки.", tags: ["Fitness"], parentId: "hobbies" },

  { id: "pe1", label: "Александр", relX: 270, relY: 100, category: "people", color: "#fbbf24", description: "Друг.", tags: ["Друзья"], parentId: "people" },
  { id: "pe2", label: "Юлия", relX: 240, relY: 230, category: "people", color: "#fbbf24", description: "Коллега.", tags: ["Работа"], parentId: "people" },

  { id: "j1", label: "Октябрь 2026", relX: -90, relY: 280, category: "journal", color: "#38bdf8", description: "Заметки.", tags: ["Месяц"], parentId: "journal" },
  { id: "j2", label: "Идеи и Мысли", relX: 100, relY: 280, category: "journal", color: "#38bdf8", description: "Мысли.", tags: ["Идеи"], parentId: "journal" },
];

const CATEGORIES = [
  { id: "all", label: "Все", color: "#ffffff" },
  { id: "study", label: "Конспекты", color: "#60a5fa" },
  { id: "projects", label: "Проекты", color: "#c084fc" },
  { id: "people", label: "Люди", color: "#fbbf24" },
  { id: "hobbies", label: "Увлечения", color: "#34d399" },
  { id: "journal", label: "Дневник", color: "#38bdf8" },
];

export const GraphView: React.FC<GraphViewProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const [particleTick, setParticleTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setParticleTick((prev) => (prev + 1.8) % 100);
    }, 30);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;

  const nodes = RAW_NODES.map((n) => ({
    ...n,
    x: centerX + n.relX,
    y: centerY + n.relY,
  }));

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;

  const filteredNodes = nodes.filter(
    (n) => filter === "all" || n.category === filter || n.id === "me"
  );

  const isVectorActive = (parent: Node, node: Node) => {
    if (!selectedNodeId) return false;

    if (selectedNodeId === "me") {
      return parent.id === "me";
    }

    if (selectedNodeId === node.id) return true;
    if (selectedNodeId === parent.id) return true;
    if (selectedNode && selectedNode.parentId === node.id && parent.id === "me") return true;

    return false;
  };

  const isNodeHighlighted = (node: Node) => {
    if (!selectedNodeId) return false;

    if (node.id === "me") return true;
    if (selectedNodeId === node.id) return true;
    if (selectedNode && node.parentId === selectedNode.id) return true;
    if (selectedNode && selectedNode.parentId === node.id) return true;

    return false;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".no-drag")) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 1.1 : 0.9;
    setScale((s) => Math.min(Math.max(s * delta, 0.5), 2.2));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex-1 overflow-hidden select-none cursor-grab active:cursor-grabbing bg-transparent"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >

      <div className="absolute top-6 left-4 right-4 z-30 flex justify-between items-center no-drag pointer-events-auto">
        <button
          onClick={onBack}
          className="p-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 transition active:scale-95 shadow-lg"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="text-center">
          <h2 className="text-sm font-bold text-white tracking-wide">Mind Vault</h2>
          <p className="text-[10px] text-gray-400">22 заметки</p>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs flex items-center gap-1.5 hover:bg-white/20 transition active:scale-95 shadow-lg"
          >
            <span>{CATEGORIES.find((c) => c.id === filter)?.label || "Все"}</span>
            <ChevronDown size={14} />
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-gray-900/90 backdrop-blur-2xl border border-white/20 rounded-2xl p-2 shadow-2xl z-40 animate-fade-in">
              <span className="text-[9px] font-bold text-gray-400 uppercase px-2 py-1 block">
                ПОКАЗАТЬ
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setFilter(cat.id);
                    setIsFilterOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs flex items-center justify-between transition ${
                    filter === cat.id
                      ? "bg-white/20 text-white font-semibold"
                      : "text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span>{cat.label}</span>
                  </div>
                  {filter === cat.id && <span className="text-xs">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 bg-gray-900/60 backdrop-blur-xl border border-white/15 p-1.5 rounded-2xl no-drag">
        <button
          onClick={() => setScale((s) => Math.min(s + 0.2, 2.2))}
          className="p-2 text-white/80 hover:text-white transition"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={() => setScale((s) => Math.max(s - 0.2, 0.5))}
          className="p-2 text-white/80 hover:text-white transition"
        >
          <Minus size={16} />
        </button>
        <button
          onClick={() => {
            setScale(1);
            setPan({ x: 0, y: 0 });
          }}
          className="p-2 text-white/80 hover:text-white transition border-t border-white/10"
        >
          <Target size={16} />
        </button>
      </div>


      <div
        className="w-full h-full relative origin-center transition-transform duration-75"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
        }}
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <filter id="svg-neon-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {filteredNodes.map((node) => {
            if (!node.parentId) return null;
            const parent = nodes.find((n) => n.id === node.parentId);
            if (!parent) return null;

            const active = isVectorActive(parent, node);

            const pointsCount = active ? 4 : 0;
            const dots = [];

            for (let i = 0; i < pointsCount; i++) {
              const offsetPercent = (particleTick + i * (100 / pointsCount)) % 100;
              const px = parent.x + (node.x - parent.x) * (offsetPercent / 100);
              const py = parent.y + (node.y - parent.y) * (offsetPercent / 100);
              const alphaPulse = 0.3 + 0.7 * Math.sin((offsetPercent / 100) * Math.PI);

              dots.push(
                <circle
                  key={i}
                  cx={px}
                  cy={py}
                  r={1.8 + alphaPulse * 0.8}
                  fill={node.color}
                  opacity={alphaPulse}
                />
              );
            }

            return (
              <g key={`${parent.id}-${node.id}`}>
                {active && (
                  <line
                    x1={parent.x}
                    y1={parent.y}
                    x2={node.x}
                    y2={node.y}
                    stroke={node.color}
                    strokeWidth="3.5"
                    opacity="0.4"
                    filter="url(#svg-neon-glow)"
                  />
                )}
                <line
                  x1={parent.x}
                  y1={parent.y}
                  x2={node.x}
                  y2={node.y}
                  stroke={active ? node.color : "rgba(255, 255, 255, 0.25)"}
                  strokeWidth={active ? "2" : "1"}
                  strokeDasharray={active ? "none" : "3 3"}
                  className="transition-all duration-300"
                />
                {dots}
              </g>
            );
          })}
        </svg>


        {filteredNodes.map((node) => {
          const isMe = node.id === "me";
          const isSelected = selectedNodeId === node.id;
          const isHighlighted = isNodeHighlighted(node);

          const isDimmed = selectedNodeId !== null && !isHighlighted;

          return (
            <div
              key={node.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNodeId(node.id);
              }}
              style={{ left: `${node.x}px`, top: `${node.y}px` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 flex flex-col items-center transition-all duration-300 no-drag ${
                isDimmed ? "opacity-25 scale-90" : "opacity-100 scale-100"
              }`}
            >
              <div
                className={`rounded-full flex items-center justify-center transition-all duration-300 ${
                  isHighlighted ? "animate-pulse" : ""
                }`}
                style={{
                  width: isMe ? "28px" : "18px",
                  height: isMe ? "28px" : "18px",
                  backgroundColor: isMe ? "#ffffff" : node.color,
                  boxShadow: isHighlighted
                    ? `0 0 25px ${node.color}, 0 0 12px #ffffff`
                    : `0 0 10px ${node.color}aa`,
                }}
              />

              <span className="text-white text-[10px] mt-1.5 font-medium bg-gray-900/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10 whitespace-nowrap shadow-lg">
                {node.label}
              </span>
            </div>
          );
        })}
      </div>


      {selectedNode && (
        <div className="absolute bottom-6 left-4 right-4 z-30 bg-gray-900/85 backdrop-blur-2xl border border-white/20 rounded-3xl p-5 text-white shadow-2xl animate-slide-up no-drag pointer-events-auto">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span
                className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-md border"
                style={{
                  borderColor: `${selectedNode.color}66`,
                  color: selectedNode.color,
                  backgroundColor: `${selectedNode.color}15`,
                }}
              >
                {selectedNode.category.toUpperCase()}
              </span>
              <h3 className="text-base font-bold mt-1 text-white">
                {selectedNode.label}
              </h3>
            </div>
            <button
              onClick={() => setSelectedNodeId(null)}
              className="text-gray-400 hover:text-white p-1"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-gray-300 mb-4 leading-relaxed">
            {selectedNode.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {selectedNode.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] bg-white/10 px-3 py-1 rounded-full text-gray-200 border border-white/10"
              >
                • {tag}
              </span>
            ))}
          </div>

          <button className="w-full py-3 bg-white text-black text-xs font-semibold rounded-2xl hover:bg-gray-100 transition active:scale-[0.98]">
            Открыть раздел ↗
          </button>
        </div>
      )}
    </div>
  );
};