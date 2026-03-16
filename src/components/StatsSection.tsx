import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import statsOverview from "@/assets/stats-overview.png";
import statsEngagement from "@/assets/stats-engagement.png";
import statsAudience from "@/assets/stats-audience.png";

const sectionAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const screenshots = [
  { src: statsAudience, caption: "Audience" },
  { src: statsOverview, caption: "Views & Retention" },
  { src: statsEngagement, caption: "AVD & Engagement" },
];

const PhoneMockup = ({
  current,
  prev,
  next,
  setCurrent,
  width,
}: {
  current: number;
  prev: () => void;
  next: () => void;
  setCurrent: (i: number) => void;
  width: string;
}) => (
  <div className="flex flex-col items-center flex-shrink-0">
    <div className="relative group">
      <div
        className={`relative rounded-[32px] border-[5px] border-[hsl(240_6%_20%)] bg-[hsl(240_10%_4%)] p-[3px] ${width}`}
        style={{ aspectRatio: "9/19.5" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[22px] bg-[hsl(240_10%_4%)] rounded-b-xl z-20" />
        <div className="relative overflow-hidden rounded-[27px] h-full">
          <img
            src={screenshots[current].src}
            alt={screenshots[current].caption}
            className="w-full h-full object-cover object-top transition-opacity duration-300"
          />
        </div>
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[35%] h-[3px] bg-[hsl(0_0%_100%/0.2)] rounded-full z-20" />
      </div>
      <button
        onClick={prev}
        className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-background/70 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors z-30"
        aria-label="Previous"
      >
        <ChevronLeft className="w-3.5 h-3.5 text-foreground" />
      </button>
      <button
        onClick={next}
        className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-background/70 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors z-30"
        aria-label="Next"
      >
        <ChevronRight className="w-3.5 h-3.5 text-foreground" />
      </button>
    </div>
    <div className={`flex flex-col items-center mt-3 gap-1.5 ${width}`}>
      <p className="text-xs text-muted-foreground font-mono-data text-center w-full">
        {screenshots[current].caption}
      </p>
      <div className="flex gap-1.5 justify-center w-full">
        {screenshots.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? "bg-accent" : "bg-muted-foreground/30"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  </div>
);

const TextBlock = ({
  tag,
  children,
}: {
  tag: string;
  children: React.ReactNode;
}) => (
  <div className="border-l-2 border-accent/40 pl-4">
    <p className="text-xs text-accent font-mono-data uppercase tracking-wider mb-1">{tag}</p>
    <p className="text-secondary-foreground leading-relaxed">{children}</p>
  </div>
);

export const StatsSection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? screenshots.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === screenshots.length - 1 ? 0 : c + 1));

  return (
    <div className="mt-16 md:mt-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionAnim}
        className="mb-10"
      >
        <p className="text-accent font-mono-data text-sm mb-2 tracking-widest uppercase">Аналитика</p>
        <h3 className="text-2xl md:text-4xl font-black">Анализ ЦА и Тренды</h3>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionAnim}
        transition={{ delay: 0.15 }}
      >
        {/* Desktop: phone left + text right */}
        <div className="hidden md:flex flex-row gap-12 items-start">
          <PhoneMockup current={current} prev={prev} next={next} setCurrent={setCurrent} width="w-[200px]" />
          <div className="flex-1 flex flex-col justify-between h-full gap-8">
            <TextBlock tag="ЦА">
              <span className="text-foreground font-semibold">25–44 года</span> — высокий эмоциональный интеллект и жизненный опыт. Тема утраты резонирует остро.
            </TextBlock>
            <TextBlock tag="Тренд">
              <span className="text-accent font-semibold">Alphaville — Forever Young</span> — вирусный тренд в соцсетях + гимн поколения, вызывающий ностальгию.
            </TextBlock>
            <TextBlock tag="Хайп">
              Джек Блек как Стив из фильма <span className="text-foreground font-semibold">Minecraft</span> — хайп-тема момента. Стилистика игры = интерес ЦА.
            </TextBlock>
          </div>
        </div>

        {/* Mobile: ЦА → phone → Тренд + Хайп */}
        <div className="flex flex-col items-center gap-6 md:hidden">
          <div className="w-full">
            <TextBlock tag="ЦА">
              <span className="text-foreground font-semibold">25–44 года</span> — высокий эмоциональный интеллект и жизненный опыт. Тема утраты резонирует остро.
            </TextBlock>
          </div>

          <PhoneMockup current={current} prev={prev} next={next} setCurrent={setCurrent} width="w-[180px]" />

          <div className="w-full space-y-6">
            <TextBlock tag="Тренд">
              <span className="text-accent font-semibold">Alphaville — Forever Young</span> — вирусный тренд в соцсетях + гимн поколения, вызывающий ностальгию.
            </TextBlock>
            <TextBlock tag="Хайп">
              Джек Блек как Стив из фильма <span className="text-foreground font-semibold">Minecraft</span> — хайп-тема момента. Стилистика игры = интерес ЦА.
            </TextBlock>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
