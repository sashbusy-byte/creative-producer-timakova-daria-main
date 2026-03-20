import { motion, AnimatePresence } from "framer-motion";
import { Play, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/lang";
import steveThumb from "@/assets/steves-saddest-day-thumb.jpg";
import dariaAvatar from "@/assets/daria-avatar.png";
import statsOverview from "@/assets/stats-overview.png";
import statsEngagement from "@/assets/stats-engagement.png";
import statsAudience from "@/assets/stats-audience.png";

const sectionAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const metricsRu = [
  { v: "17%", l: "CTR" },
  { v: "59M", l: "Просмотров" },
  { v: "78%", l: "Retention" },
  { v: "110%", l: "AVD" },
  { v: "11K", l: "Комментарии" },
];

const metricsEn = [
  { v: "17%", l: "CTR" },
  { v: "59M", l: "Views" },
  { v: "78%", l: "Retention" },
  { v: "110%", l: "AVD" },
  { v: "11K", l: "Comments" },
];

const cardsRu = [
  {
    title: "Situation",
    text: "Клиент — PolyBuzz (AI-чат с персонажами). Цель: User Acquisition — нативная интеграция для масштабирования базы пользователей. Желаемый CTR 5–10%.",
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
    text: "CTR 17% (в 2,5 выше желаемого), 59M просмотров, 78% retention, 110% AVD. Самое комментируемое видео канала (11K). Высокий трафик → долгосрочное сотрудничество с клиентом (85% повторных продаж).",
  },
];

const cardsEn = [
  {
    title: "Situation",
    text: "Client — PolyBuzz (AI character chat). Goal: User Acquisition — native integration to scale the user base. Target CTR 5–10%.",
  },
  {
    title: "Task",
    text: "Full production cycle: script, brief, location assets (Minecraft → Blender), sound design. Key objectives — 3-sec hook, retention, organic app showcase, and CTA.",
  },
  {
    title: "Action",
    text: "Bold concept: hero at his mother's funeral, childhood flashbacks to Alphaville — Forever Young. Finale — hero chats with 'mom' through PolyBuzz. Emotional 'grey zone' as the main hook.",
  },
  {
    title: "Result",
    text: "CTR 17% (2.5× the target), 59M views, 78% retention, 110% AVD. Most commented video on the channel (11K). High traffic → long-term client partnership (85% repeat sales).",
  },
];

const slides = [
  { id: "thumb", img: steveThumb, captionRu: "Смахни для аналитики", captionEn: "Swipe for analytics" },
  { id: "overview", img: statsOverview, captionRu: "Views & Retention", captionEn: "Views & Retention" },
  { id: "engagement", img: statsEngagement, captionRu: "AVD & Engagement", captionEn: "AVD & Engagement" },
  { id: "audience", img: statsAudience, captionRu: "Audience Analysis", captionEn: "Audience Analysis" },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
};

const PhoneMockupCarousel = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const { lang } = useLang();

  const current = Math.abs(page % slides.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="flex flex-col items-center flex-shrink-0">
      <div className="relative group w-[260px] md:w-[280px]">
        {/* Buttons */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center hover:bg-background transition-colors z-30"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center hover:bg-background transition-colors z-30"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4 text-foreground" />
        </button>

        <div className="relative rounded-[40px] border-[6px] border-[hsl(240_6%_20%)] bg-[hsl(240_10%_4%)] p-[4px] shadow-[0_20px_60px_-12px_rgba(0,0,0,0.9)]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[28px] bg-[hsl(240_10%_4%)] rounded-b-2xl z-20" />
          <div className="relative overflow-hidden rounded-[34px] aspect-[9/19.5]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 w-full h-full"
              >
                <img src={slides[current].img} alt={slides[current].id} className="w-full h-full object-cover object-top" />
                
                {current === 0 && (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center bg-background/20">
                      <a
                        href="https://www.youtube.com/shorts/5O84BAbkfTE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center hover:scale-110 transition-transform shadow-xl group/play"
                      >
                        <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                      </a>
                    </div>
                    {/* Swipe prompt */}
                    <div className="absolute bottom-10 left-0 right-0 text-center px-4 animate-bounce">
                      <p className="text-white text-xs font-bold drop-shadow-lg uppercase tracking-wider">
                        {lang === "ru" ? "Смахни для аналитики" : "Swipe for analytics"}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[35%] h-[4px] bg-[hsl(0_0%_100%/0.2)] rounded-full z-20" />
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-2">
        <p className="text-xs text-muted-foreground font-mono-data text-center px-4">
          {lang === "ru" ? slides[current].captionRu : slides[current].captionEn}
        </p>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const dir = i > current ? 1 : -1;
                setPage([i, dir]);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? "bg-accent" : "bg-muted-foreground/30"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const StarCards = ({ cards }: { cards: typeof cardsRu }) => (
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

export const DeepDiveCase = () => {
  const { lang } = useLang();
  const metrics = lang === "ru" ? metricsRu : metricsEn;
  const cards = lang === "ru" ? cardsRu : cardsEn;

  return (
    <section className="py-12 md:py-20">
      <div className="container max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 justify-center">
          <div className="w-full max-w-xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={sectionAnim} className="mb-8">
              <p className="text-accent font-mono-data text-sm mb-2 tracking-widest uppercase">
                {lang === "ru" ? "Топ-кейс" : "Top Case"}
              </p>
              <h2 className="text-3xl md:text-5xl font-black mb-2">Steve's Saddest Day</h2>
              <p className="text-muted-foreground text-lg">High-Conversion Native Ad</p>
            </motion.div>
            <div className="flex gap-6 md:gap-8 mb-6">
              {metrics.map((m) => (
                <div key={m.l} className="font-mono-data">
                  <div className="text-2xl md:text-3xl font-black text-primary leading-none">{m.v}</div>
                  <div className="text-muted-foreground text-xs mt-1">{m.l}</div>
                </div>
              ))}
            </div>
            <StarCards cards={cards} />
          </div>

          <div className="lg:sticky lg:top-24 lg:pt-20 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <PhoneMockupCarousel />
            </motion.div>
          </div>
        </div>

        {/* Fun Fact */}
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
            alt={lang === "ru" ? "Дарья" : "Daria"}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-primary/30"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-bold text-foreground">{lang === "ru" ? "Дарья" : "Daria"}</span>
              <span className="text-xs text-muted-foreground font-mono-data">fun fact</span>
              <span className="inline-block text-sm drop-shadow-[0_0_12px_hsl(48_100%_60%/1)]">💡</span>
            </div>
            <div className="bg-primary/15 border border-primary/20 rounded-2xl rounded-bl-sm px-4 py-3">
              <p className="text-sm text-foreground leading-relaxed">
                {lang === "ru"
                  ? "Команда и заказчик сомневались в теме «похорон». Я собрала аналитику: бенчмарки, примеры успешных видео, комментарии аудитории без негатива — и убедила дать проекту зелёный свет."
                  : "The team and client doubted the 'funeral' concept. I gathered analytics: benchmarks, successful video examples, audience comments with no negativity — and convinced them to greenlight the project."}
              </p>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono-data mt-1 block ml-1">delivered ✓✓</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
