import { motion } from "framer-motion";

const sectionAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type Pill = { label: string };

const groups: Array<{
  title: string;
  subtitle: string;
  accent: "green" | "blue";
  pills: Pill[];
}> = [
  {
    title: "Аналитика и Стратегия",
    subtitle: "От метрик к решениям для UA и контента",
    accent: "green",
    pills: [
      { label: "Market Analysis" },
      { label: "CPI" },
      { label: "CTR" },
      { label: "Retention" },
      { label: "ROAS" },
      { label: "Viral Strategy" },
      { label: "Content Deconstruction" },
      { label: "Game Mechanics" },
    ],
  },
  {
    title: "AI и Стек",
    subtitle: "Инструменты, ускоряющие продакшн и итерации",
    accent: "blue",
    pills: [
      { label: "Gemini / ChatGPT" },
      { label: "Midjourney" },
      { label: "Suno" },
      { label: "ElevenLabs" },
      { label: "Adobe Premiere Pro" },
      { label: "Figma" },
    ],
  },
  {
    title: "Продакшн и управление",
    subtitle: "Full-cycle и коммуникация между командами",
    accent: "green",
    pills: [
      { label: "Full-cycle Management" },
      { label: "Bridge-communication" },
      { label: "Emotional Storytelling" },
    ],
  },
];

const pillClasses = (accent: "green" | "blue") =>
  accent === "green"
    ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15"
    : "bg-accent/10 text-accent border-accent/20 hover:bg-accent/15";

export const ExpertiseSection = () => (
  <section className="py-20 md:py-32">
    <div className="container max-w-5xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionAnim}
        className="mb-12 max-w-3xl"
      >
        <p className="text-accent font-mono-data text-sm mb-2 tracking-widest uppercase">Expertise</p>
        <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-8">
          Expertise &amp; <span className="text-glow-green">Stack</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {groups.map((g, i) => (
          <motion.div
            key={g.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionAnim}
            transition={{ delay: 0.08 + i * 0.08 }}
            className="glass-card p-7"
          >
            <div className="mb-5">
              <p className="text-foreground font-bold text-lg">{g.title}</p>
              <p className="text-muted-foreground text-sm mt-1">{g.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.pills.map((p) => (
                <span
                  key={p.label}
                  className={[
                    "inline-flex items-center min-h-11 px-3 rounded-full border text-sm font-mono-data transition-colors select-none",
                    pillClasses(g.accent),
                  ].join(" ")}
                >
                  {p.label}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

