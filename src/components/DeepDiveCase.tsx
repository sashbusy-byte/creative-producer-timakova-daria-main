import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { StatsSection } from "./StatsSection";
import steveThumb from "@/assets/steves-saddest-day-thumb.jpg";
import dariaAvatar from "@/assets/daria-avatar.png";

const sectionAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const metrics = [
  { v: "59M", l: "Views" },
  { v: "78%", l: "Retention" },
  { v: "110%", l: "AVD" },
  { v: "11K", l: "Comments" },
];

const cards = [
  {
    title: "Situation",
    text: "Клиент — PolyBuzz (AI-чат с персонажами). Цель: нативная интеграция для привлечения пользователей на YouTube-канале.",
  },
  {
    title: "Task",
    text: "Полный цикл продакшена: сценарий, ТЗ, ассеты локаций (Minecraft → Blender), саунд-дизайн. Ключевое — хук за 3 сек, удержание, органичная демонстрация приложения и CTA.",
  },
  {
    title: "Action",
    text: "Смелый сценарий: герой на похоронах матери, флешбэки детства под Alphaville — Forever Young. Финал — герой общается с «мамой» через PolyBuzz. Эмоциональная «серая зона» как главный хук.",
  },
  {
    title: "Result",
    text: "59M просмотров, 78% retention, 110% AVD. Самое комментируемое видео канала (11K). Высокий трафик → долгосрочное сотрудничество с клиентом.",
  },
];

const IPhoneMockup = () => (
  <a
    href="https://www.youtube.com/shorts/5O84BAbkfTE"
    target="_blank"
    rel="noopener noreferrer"
    className="relative group block w-[260px] md:w-[280px] flex-shrink-0"
  >
    <div className="relative rounded-[40px] border-[6px] border-[hsl(240_6%_20%)] bg-[hsl(240_10%_4%)] p-[4px] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.9)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[28px] bg-[hsl(240_10%_4%)] rounded-b-2xl z-20" />
      <div className="relative overflow-hidden rounded-[34px] aspect-[9/19.5]">
        <img src={steveThumb} alt="Steve's Saddest Day — YouTube Shorts" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
            <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[35%] h-[4px] bg-[hsl(0_0%_100%/0.2)] rounded-full z-20" />
    </div>
    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 glass-card px-3 py-1.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
      <ExternalLink className="w-3 h-3 text-accent" />
      <span className="text-xs font-mono-data text-accent">Смотреть на YouTube</span>
    </div>
    <div className="absolute -inset-8 bg-primary/5 rounded-[56px] blur-3xl -z-10 group-hover:bg-primary/25 transition-all duration-500 group-hover:blur-[40px]" />
  </a>
);

const StarCards = () => (
  <div className="grid grid-cols-2 gap-3">
    {cards.map((card, i) => (
      <motion.div
        key={card.title}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionAnim}
        transition={{ delay: 0.1 + i * 0.08 }}
      >
        <div className="glass-card p-4 h-full relative flex flex-col">
          <span className="absolute top-3 right-3 text-2xl font-mono-data text-muted-foreground/20 font-black leading-none">{i + 1}</span>
          <h3 className="font-bold text-base text-accent mb-2 font-mono-data">{card.title}</h3>
          <p className="text-secondary-foreground text-sm leading-relaxed">{card.text}</p>
        </div>
      </motion.div>
    ))}
  </div>
);


export const DeepDiveCase = () => (
  <section className="py-20 md:py-32">
    <div className="container max-w-5xl mx-auto">
      {/* Main layout: Header + Metrics + STAR cards left, phone right */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 justify-center">
        <div className="w-full max-w-xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim} className="mb-8">
            <p className="text-accent font-mono-data text-sm mb-2 tracking-widest uppercase">Топ-кейс</p>
            <h2 className="text-3xl md:text-5xl font-black mb-2">Steve's Saddest Day</h2>
            <p className="text-muted-foreground text-lg">
              Самая просматриваемая рекламная интеграция
            </p>
          </motion.div>
          <div className="flex gap-6 md:gap-8 mb-6">
            {metrics.map((m) => (
              <div key={m.l} className="font-mono-data">
                <div className="text-2xl md:text-3xl font-black text-primary leading-none">{m.v}</div>
                <div className="text-muted-foreground text-xs mt-1">{m.l}</div>
              </div>
            ))}
          </div>
          <StarCards />
        </div>

        <div className="lg:sticky lg:top-24 lg:pt-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <IPhoneMockup />
          </motion.div>
        </div>
      </div>


      {/* Fun Fact — chat bubble */}
      <motion.div
        className="mt-12 flex items-end gap-3 max-w-xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionAnim}
        transition={{ delay: 0.3 }}
      >
        <img
          src={dariaAvatar}
          alt="Дарья"
          className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-primary/30"
        />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-foreground">Дарья</span>
            <span className="text-xs text-muted-foreground font-mono-data">fun fact</span>
              <span className="inline-block text-sm drop-shadow-[0_0_12px_hsl(48_100%_60%/1)]">💡</span>
          </div>
          <div className="bg-primary/15 border border-primary/20 rounded-2xl rounded-bl-sm px-4 py-3">
            <p className="text-sm text-foreground leading-relaxed">
              Команда и заказчик сомневались в теме «похорон» — казалось слишком рискованно. Я собрала аналитику: бенчмарки, примеры успешных видео, комментарии аудитории без негатива — и убедила дать проекту зелёный свет.
            </p>
          </div>
          <span className="text-[10px] text-muted-foreground font-mono-data mt-1 block ml-1">delivered ✓✓</span>
        </div>
      </motion.div>

      {/* Stats & Audience Analysis */}
      <StatsSection />
    </div>
  </section>
);
