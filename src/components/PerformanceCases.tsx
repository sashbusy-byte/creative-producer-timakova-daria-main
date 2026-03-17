import { motion } from "framer-motion";
import { useRef } from "react";
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
    title: "PolyBuzz Native Ad Integration",
    thumbnail: "https://img.youtube.com/vi/5O84BAbkfTE/hq720.jpg",
    videoUrl: "https://www.youtube.com/watch?v=5O84BAbkfTE",
    metrics: [{ label: "Views", value: "59M" }, { label: "Retention", value: "78%" }, { label: "AVD", value: "110%" }],
  },
  {
    title: "Split Screen - Most viewed video",
    thumbnail: "https://img.youtube.com/vi/xIEZoz0mnDQ/hq720.jpg",
    videoUrl: "https://www.youtube.com/watch?v=xIEZoz0mnDQ",
    metrics: [{ label: "Views", value: "183.8M" }, { label: "Retention", value: "79.4%" }, { label: "AVD", value: "216.9%" }],
  },
  {
    title: "FaceMoji Native Ad Integration",
    thumbnail: "https://img.youtube.com/vi/As7_NzD50KA/hq720.jpg",
    videoUrl: "https://www.youtube.com/watch?v=As7_NzD50KA",
    metrics: [{ label: "Views", value: "58M" }],
  },
  {
    title: "High-Performance Format — Eye-Catching Illusion",
    thumbnail: "https://img.youtube.com/vi/8W8erEnY4UU/hq720.jpg",
    videoUrl: "https://www.youtube.com/watch?v=8W8erEnY4UU",
    metrics: [{ label: "Views", value: "72.2M" }, { label: "Retention", value: "82.7%" }, { label: "AVD", value: "177.5%" }],
  },
  {
    title: "BlockBlast × «Игра в Кальмара»",
    thumbnail: "https://img.youtube.com/vi/BEPJLyLDo0g/hq720.jpg",
    videoUrl: "https://www.youtube.com/watch?v=BEPJLyLDo0g",
    metrics: [{ label: "Views", value: "6.8M" }, { label: "Retention", value: "77%" }, { label: "AVD", value: "91%" }],
  },
  {
    title: "Question AI Native Ad Integration",
    thumbnail: "https://img.youtube.com/vi/mMdEhSK1g-Q/hq720.jpg",
    videoUrl: "https://www.youtube.com/watch?v=mMdEhSK1g-Q",
    metrics: [{ label: "Views", value: "9.1M" }, { label: "Retention", value: "76.7%" }, { label: "AVD", value: "109%" }],
  },
  {
    title: "PolyBuzz Native Ad Integration",
    thumbnail: "https://img.youtube.com/vi/3uUX3XnDoPQ/hq720.jpg",
    videoUrl: "https://www.youtube.com/watch?v=3uUX3XnDoPQ",
    metrics: [{ label: "Views", value: "4.4M" }, { label: "Retention", value: "69%" }, { label: "AVD", value: "98.5%" }],
  },
  {
    title: "BlockBlast Native Ad Integration",
    thumbnail: "https://img.youtube.com/vi/1jsP3E_eg2w/hq720.jpg",
    videoUrl: "https://www.youtube.com/watch?v=1jsP3E_eg2w",
    metrics: [{ label: "Views", value: "6.4M" }],
  },
  {
    title: "Long-form Storytelling",
    thumbnail: "https://img.youtube.com/vi/77i7ozZRYg8/hq720.jpg",
    videoUrl: "https://www.youtube.com/watch?v=77i7ozZRYg8",
    metrics: [{ label: "Views", value: "4.2M" }, { label: "Retention", value: "59.9%" }, { label: "CTR", value: "8.8%" }],
  },
];

const CARD_W = 240;

export const PerformanceCases = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="showreel" className="py-20 md:py-32 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-accent font-mono-data text-sm mb-2 tracking-widest uppercase">100% Organic Reach</p>
          <h2 className="text-3xl md:text-5xl font-black mb-3">
            Showreel
          </h2>

          <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl">
            <span className="hidden md:inline">
              От гипотезы —{" "}
              <span className="whitespace-nowrap">
                к <span className="text-glow-green">59&nbsp;млн</span> просмотров
              </span>
            </span>
            <span className="md:hidden">
              От гипотезы —<br />
              к <span className="text-glow-green">59&nbsp;млн</span> просмотров
            </span>
          </p>

          <div className="flex items-center gap-3 mb-10 max-w-md">
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

        {/* Carousel */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {cases.map((c, i) => (
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
                  <div
                    className="relative w-full bg-muted/40"
                    style={{ aspectRatio: "9/16" }}
                  >
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
