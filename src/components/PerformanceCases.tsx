import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
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
    title: "Split-Screen - Most Viewed Video",
    thumbnail: "https://img.youtube.com/vi/xIEZoz0mnDQ/hq720.jpg",
    videoUrl: "https://www.youtube.com/watch?v=xIEZoz0mnDQ",
    metrics: [{ label: "Views", value: "183.8M" }, { label: "Retention", value: "79.4%" }, { label: "AVD", value: "216.9%" }],
  },
  {
    title: "Most Viewed 3D Video",
    thumbnail: "https://img.youtube.com/vi/UBxurlEANTU/hq720.jpg",
    videoUrl: "https://youtube.com/shorts/UBxurlEANTU",
    metrics: [{ label: "Views", value: "133M" }, { label: "Retention", value: "78.6%" }, { label: "AVD", value: "184%" }],
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
    title: "Split-Screen - High-Retention Format",
    thumbnail: "https://img.youtube.com/vi/_Hsua9qDXsw/hq720.jpg",
    videoUrl: "https://youtube.com/shorts/_Hsua9qDXsw",
    metrics: [{ label: "Views", value: "70M" }, { label: "Retention", value: "75%" }, { label: "AVD", value: "417%" }],
  },
  {
    title: "BlockBlast Native Ad Integration",
    thumbnail: "https://img.youtube.com/vi/BEPJLyLDo0g/hq720.jpg",
    videoUrl: "https://www.youtube.com/watch?v=BEPJLyLDo0g",
    metrics: [{ label: "Views", value: "6.8M" }, { label: "Retention", value: "77%" }, { label: "AVD", value: "91%" }],
  },
  {
    title: "Question Ai Native Ad Integration",
    thumbnail: "https://img.youtube.com/vi/mMdEhSK1g-Q/hq720.jpg",
    videoUrl: "https://www.youtube.com/watch?v=mMdEhSK1g-Q",
    metrics: [{ label: "Views", value: "9.1M" }, { label: "Retention", value: "76.7%" }, { label: "AVD", value: "109%" }],
  },
  {
    title: "Hype-Themed Video",
    thumbnail: "https://img.youtube.com/vi/rOw8OkUhj2s/hq720.jpg",
    videoUrl: "https://youtube.com/shorts/rOw8OkUhj2s",
    metrics: [{ label: "Views", value: "20.3M" }, { label: "Retention", value: "78.8%" }, { label: "AVD", value: "243.6%" }],
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

  const scrollLeftBy = (amount: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    let animationId: number;
    let isUserInteracting = false;
    let autoScrollTimeout: NodeJS.Timeout;

    const onManualScroll = (e: Event) => {
      const { amount } = (e as CustomEvent).detail;
      isUserInteracting = true;
      el.scrollBy({ left: amount, behavior: "smooth" });
      
      clearTimeout(autoScrollTimeout);
      autoScrollTimeout = setTimeout(() => {
        isUserInteracting = false;
      }, 800);
    };

    el.addEventListener('manualScroll', onManualScroll);
    
    let isDown = false;
    let startX: number;
    let scrollLeft: number;
    let totalWalk = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      isUserInteracting = true;
      totalWalk = 0;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.style.cursor = 'grabbing';
      clearTimeout(autoScrollTimeout);
    };
    
    const onMouseUp = () => { 
      if (!isDown) return;
      isDown = false; 
      if (el) el.style.cursor = 'grab';
      
      autoScrollTimeout = setTimeout(() => {
        isUserInteracting = false;
      }, 1000);
    };
    
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown || !el) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      totalWalk += Math.abs(e.movementX);
      el.scrollLeft = scrollLeft - walk;
    };
    
    const onClick = (e: MouseEvent) => {
      if (totalWalk > 10) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onTouchStart = () => { 
      isUserInteracting = true;
      clearTimeout(autoScrollTimeout);
    };
    const onTouchEnd = () => { 
      autoScrollTimeout = setTimeout(() => {
        isUserInteracting = false;
      }, 1000);
    };

    let accumulator = 0;
    let lastTime = performance.now();

    const scroll = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      
      if (!isUserInteracting && el) {
        accumulator += (30 * delta) / 1000; // 30px per sec
        if (accumulator >= 1) {
          const step = Math.floor(accumulator);
          el.scrollBy({ left: step, behavior: "auto" });
          accumulator -= step;
          
          if (el.scrollLeft >= el.scrollWidth / 2) {
            el.scrollLeft -= el.scrollWidth / 2;
          }
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    el.addEventListener('click', onClick, { capture: true }); // Intercept clicks before a tag
    el.addEventListener('touchstart', onTouchStart, {passive: true});
    el.addEventListener('touchend', onTouchEnd);
    
    el.style.cursor = 'grab';
    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener('manualScroll', onManualScroll);
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('click', onClick, { capture: true });
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      clearTimeout(autoScrollTimeout);
    };
  }, []);

  return (
    <section id="showreel" className="py-12 md:py-20 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-accent font-mono-data text-sm mb-2 tracking-widest uppercase">Showreel</p>
          <h2 className="text-3xl md:text-5xl font-black mb-8">
            100% Organic Reach
          </h2>

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
        <div className="relative overflow-hidden group/carousel">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {[...cases, ...cases].map((c, i) => (
              <div
                key={i}
                className="glass-card overflow-hidden cursor-pointer group shrink-0"
                style={{ width: CARD_W }}
              >
                <a
                  href={c.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
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
                      draggable={false}
                      onDragStart={(e) => e.preventDefault()}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
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

          <button
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.dispatchEvent(new CustomEvent('manualScroll', { detail: { amount: -CARD_W - 16 } }));
              }
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background border border-primary/20 rounded-full text-primary hover:bg-primary/20 hover:scale-110 transition-all z-50 shadow-lg cursor-pointer pointer-events-auto"
            aria-label="Scroll left"
          >
            &#8592;
          </button>
          <button
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.dispatchEvent(new CustomEvent('manualScroll', { detail: { amount: CARD_W + 16 } }));
              }
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background border border-primary/20 rounded-full text-primary hover:bg-primary/20 hover:scale-110 transition-all z-50 shadow-lg cursor-pointer pointer-events-auto"
            aria-label="Scroll right"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
};
