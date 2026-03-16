import { motion } from "framer-motion";
import { useRef, useEffect, useCallback } from "react";
import { Play } from "lucide-react";

interface CaseMetric {
  label: string;
  value: string;
}

interface CaseData {
  title: string;
  thumbnail: string;
  videoUrl: string;
  metrics: CaseMetric[];
}

const cases: CaseData[] = [
  {
    title: "Рекламная интеграция для PolyBuzz",
    thumbnail: "https://img.youtube.com/vi/5O84BAbkfTE/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=5O84BAbkfTE",
    metrics: [{ label: "Views", value: "59M" }, { label: "Retention", value: "78%" }, { label: "AVD", value: "110%" }],
  },
  {
    title: "Split Screen — самый просматриваемый креатив",
    thumbnail: "https://img.youtube.com/vi/xIEZoz0mnDQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=xIEZoz0mnDQ",
    metrics: [{ label: "Views", value: "183.8M" }, { label: "Retention", value: "79.4%" }, { label: "AVD", value: "216.9%" }],
  },
  {
    title: "Популярный формат — иллюзия",
    thumbnail: "https://img.youtube.com/vi/8W8erEnY4UU/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=8W8erEnY4UU",
    metrics: [{ label: "Views", value: "72.2M" }, { label: "Retention", value: "82.7%" }, { label: "AVD", value: "177.5%" }],
  },
  {
    title: "BlockBlast × «Игра в Кальмара»",
    thumbnail: "https://img.youtube.com/vi/BEPJLyLDo0g/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=BEPJLyLDo0g",
    metrics: [{ label: "Views", value: "6.8M" }, { label: "Retention", value: "77%" }, { label: "AVD", value: "91%" }],
  },
  {
    title: "Рекламная интеграция для Question AI",
    thumbnail: "https://img.youtube.com/vi/mMdEhSK1g-Q/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=mMdEhSK1g-Q",
    metrics: [{ label: "Views", value: "9.1M" }, { label: "Retention", value: "76.7%" }, { label: "AVD", value: "109%" }],
  },
  {
    title: "Рекламная интеграция для PolyBuzz",
    thumbnail: "https://img.youtube.com/vi/3uUX3XnDoPQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=3uUX3XnDoPQ",
    metrics: [{ label: "Views", value: "4.4M" }, { label: "Retention", value: "69%" }, { label: "AVD", value: "98.5%" }],
  },
  {
    title: "Рекламная интеграция для BlockBlast",
    thumbnail: "https://img.youtube.com/vi/1jsP3E_eg2w/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=1jsP3E_eg2w",
    metrics: [{ label: "Views", value: "6.4M" }],
  },
  {
    title: "Рекламная интеграция для FaceMoji",
    thumbnail: "https://img.youtube.com/vi/As7_NzD50KA/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=As7_NzD50KA",
    metrics: [{ label: "Views", value: "2M" }],
  },
  {
    title: "Длинный креатив",
    thumbnail: "https://img.youtube.com/vi/77i7ozZRYg8/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=77i7ozZRYg8",
    metrics: [{ label: "Views", value: "4.2M" }, { label: "Retention", value: "59.9%" }, { label: "CTR", value: "8.8%" }],
  },
];

const CARD_W = 240;
const GAP = 16;
const AUTO_SCROLL_SPEED = 0.5; // pixels per frame

export const PerformanceCases = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const isPaused = useRef(false);
  const featured = cases[0];

  // Duplicate items for infinite illusion
  const loopedCases = [...cases, ...cases, ...cases];
  const singleSetWidth = cases.length * (CARD_W + GAP);

  const autoScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || isPaused.current) {
      animRef.current = requestAnimationFrame(autoScroll);
      return;
    }

    el.scrollLeft += AUTO_SCROLL_SPEED;

    // Reset to middle set when we've scrolled past it
    if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft -= singleSetWidth;
    }
    if (el.scrollLeft <= 0) {
      el.scrollLeft += singleSetWidth;
    }

    animRef.current = requestAnimationFrame(autoScroll);
  }, [singleSetWidth]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      // Start from the middle set
      el.scrollLeft = singleSetWidth;
    }
    animRef.current = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animRef.current);
  }, [autoScroll, singleSetWidth]);

  return (
    <section className="py-20 md:py-32 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            <span className="hidden md:inline">От гипотезы — <span className="whitespace-nowrap">к <span className="text-glow-green">59 000 000</span> просмотров</span></span>
            <span className="md:hidden">От гипотезы —<br />к <span className="text-glow-green">59 млн</span> просмотров</span>
          </h2>

          <div className="flex items-center gap-3 mb-12 max-w-md">
            <span className="text-muted-foreground text-sm font-mono-data">💡 Hypothesis</span>
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span className="text-primary text-sm font-mono-data font-bold">🎯 59M Views</span>
          </div>
        </motion.div>

        {/* Featured showreel */}
        <motion.a
          href={featured.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="glass-card block overflow-hidden rounded-2xl border border-primary/20 mb-10 md:mb-14 group"
        >
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="relative md:col-span-7" style={{ aspectRatio: "16/9" }}>
              <img
                src={featured.thumbnail}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-14 w-14 rounded-full bg-primary/85 backdrop-blur-sm flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                </div>
              </div>
            </div>

            <div className="md:col-span-5 p-6 md:p-7 flex flex-col justify-between gap-5">
              <div>
                <p className="text-accent font-mono-data text-xs tracking-widest uppercase mb-2">Showreel</p>
                <h3 className="text-xl md:text-2xl font-black leading-snug">{featured.title}</h3>
                <p className="text-muted-foreground text-sm mt-3">
                  Нажмите, чтобы открыть видео. На сайте используется статичный постер для стабильного отображения без VPN.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {featured.metrics.map((m) => (
                  <span
                    key={m.label}
                    className="text-xs font-mono-data bg-background/60 backdrop-blur-sm rounded-full px-3 py-2 border border-border/60"
                  >
                    <span className="text-primary font-bold">{m.value}</span>{" "}
                    <span className="text-muted-foreground">{m.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.a>

        {/* Infinite carousel */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => { isPaused.current = true; }}
          onMouseLeave={() => { isPaused.current = false; }}
          onTouchStart={() => { isPaused.current = true; }}
          onTouchEnd={() => { setTimeout(() => { isPaused.current = false; }, 2000); }}
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {loopedCases.map((c, i) => (
              <div
                key={i}
                className="glass-card overflow-hidden cursor-pointer group snap-start shrink-0"
                style={{ width: CARD_W }}
              >
                <a
                  href={c.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative w-full" style={{ aspectRatio: "9/16" }}>
                    <img
                      src={c.thumbnail}
                      alt={c.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                      <p className="text-foreground font-bold text-xs leading-tight mb-2 line-clamp-2">{c.title}</p>
                      <div className="flex flex-wrap gap-1">
                        {c.metrics.map((m) => (
                          <span
                            key={m.label}
                            className="text-[10px] font-mono-data bg-background/60 backdrop-blur-sm rounded px-1.5 py-0.5"
                          >
                            <span className="text-primary font-bold">{m.value}</span>{" "}
                            <span className="text-muted-foreground">{m.label}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
