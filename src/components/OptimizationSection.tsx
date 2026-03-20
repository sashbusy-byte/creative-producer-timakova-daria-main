import { motion } from "framer-motion";
import { Bot, BookOpen, GitBranch } from "lucide-react";
import { useLang } from "@/lib/lang";

const sectionAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const pillarsRu = [
  {
    icon: Bot,
    tag: "AI Tools",
    title: "AI в пайплайне",
    items: [
      { tool: "Nano Banana", desc: "Раскадровка без художника" },
      { tool: "Gemini", desc: "Структура сценариев и ТЗ" },
      { tool: "ElevenLabs", desc: "Генерация озвучки на лету" },
    ],
  },
  {
    icon: BookOpen,
    tag: "Project Bible",
    title: "База знаний",
    items: [
      { tool: "Библия проекта", desc: "Стандарты визуала и смысла" },
      { tool: "Алгоритмы идей", desc: "От концепта до чек-листа" },
      { tool: "Методички", desc: "Стилистика и классификация юмора" },
    ],
  },
  {
    icon: GitBranch,
    tag: "MARKETING FLOW",
    title: "Data-Driven продакшн",
    items: [
      { tool: "Анализ трендов", desc: "Инвестиции в потенциал" },
      { tool: "Тесты гипотез", desc: "Ускоренный отсев" },
      { tool: "Zero Waste", desc: "Минимум итераций" },
    ],
  },
];

const pillarsEn = [
  {
    icon: Bot,
    tag: "AI Tools",
    title: "AI in Pipeline",
    items: [
      { tool: "Nano Banana", desc: "Storyboarding without an artist" },
      { tool: "Gemini", desc: "Script structure and briefs" },
      { tool: "ElevenLabs", desc: "On-the-fly voiceover generation" },
    ],
  },
  {
    icon: BookOpen,
    tag: "Project Bible",
    title: "Knowledge Base",
    items: [
      { tool: "Project Bible", desc: "Visual and narrative standards" },
      { tool: "Idea Algorithms", desc: "From concept to checklist" },
      { tool: "Style Guides", desc: "Aesthetics and humour classification" },
    ],
  },
  {
    icon: GitBranch,
    tag: "MARKETING FLOW",
    title: "Data-Driven Production",
    items: [
      { tool: "Trend Analysis", desc: "Invest in potential" },
      { tool: "Hypothesis Tests", desc: "Accelerated filtering" },
      { tool: "Zero Waste", desc: "Minimum iterations" },
    ],
  },
];

export const OptimizationSection = () => {
  const { lang } = useLang();
  const pillars = lang === "ru" ? pillarsRu : pillarsEn;

  return (
    <section className="py-12 md:py-20">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionAnim}
          className="mb-12 max-w-3xl"
        >
          <p className="text-accent font-mono-data text-sm mb-2 tracking-widest uppercase">
            {lang === "ru" ? "Процессы" : "Workflow"}
          </p>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            −25% {lang === "ru" ? "времени" : "time"}
            <br />
            <span className="text-muted-foreground text-2xl md:text-3xl font-bold">
              {lang === "ru" ? "на продакшн" : "on production"}
            </span>
          </h2>
          <p className="text-secondary-foreground text-lg leading-relaxed">
            {lang === "ru"
              ? "Оптимизация через AI-инструменты, систему гайдлайнов и\u00a0параллельные рабочие\u00a0процессы."
              : "Optimisation through AI tools, a guidelines system, and parallel workflows."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, pi) => (
            <motion.div
              key={pillar.tag}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionAnim}
              transition={{ delay: 0.1 + pi * 0.1 }}
              className="glass-card p-7 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <pillar.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-accent font-mono-data uppercase tracking-wider">{pillar.tag}</p>
                  <p className="text-foreground font-bold text-base">{pillar.title}</p>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                {pillar.items.map((item) => (
                  <div key={item.tool} className="border-l-2 border-accent/20 pl-4 py-0.5">
                    <p className="text-foreground font-semibold text-base mb-1.5 leading-tight">{item.tool}</p>
                    <p className="text-muted-foreground text-sm leading-snug opacity-90">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
