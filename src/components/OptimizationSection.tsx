import { motion } from "framer-motion";
import { Bot, BookOpen, GitBranch } from "lucide-react";

const sectionAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const pillars = [
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
    tag: "Pipeline",
    title: "Параллельные процессы",
    items: [
      { tool: "Конвейер", desc: "Монтаж → анимация → препрод одновременно" },
      { tool: "Результат", desc: "−25% времени на производство" },
    ],
  },
];

export const OptimizationSection = () => (
  <section className="py-20 md:py-32">
    <div className="container max-w-5xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionAnim}
        className="mb-12 max-w-3xl"
      >
        <p className="text-accent font-mono-data text-sm mb-2 tracking-widest uppercase">Процессы</p>
        <h2 className="text-3xl md:text-5xl font-black mb-4">
          −25% времени
          <br />
          <span className="text-muted-foreground text-2xl md:text-3xl font-bold">на продакшн</span>
        </h2>
        <p className="text-secondary-foreground text-lg leading-relaxed">
          Оптимизация через AI-инструменты, систему гайдлайнов и&nbsp;параллельные рабочие&nbsp;процессы.
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
                <div key={item.tool} className="border-l-2 border-accent/20 pl-3">
                  <p className="text-foreground font-semibold text-base">{item.tool}</p>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
