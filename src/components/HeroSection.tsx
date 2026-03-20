import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import dariaAvatar from "@/assets/daria-avatar.png";
import { ClientsStrip } from "./ClientsStrip";
import { useLang } from "@/lib/lang";

interface CountUpProps {
  target: string;
  duration?: number;
}

const CountUp = ({ target, duration = 2 }: CountUpProps) => {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const parsed = useRef(() => {
    const match = target.match(/^([^\d]*)(\d[\d,.]*)(.*)$/);
    if (!match) return { num: 0, prefix: "", suffix: target, hasComma: false, decimals: 0 };
    const prefix = match[1];
    const numStr = match[2];
    const suffix = match[3];
    const hasComma = numStr.includes(",");
    const cleanNum = numStr.replace(/,/g, "");
    const decimals = cleanNum.includes(".") ? cleanNum.split(".")[1].length : 0;
    return { num: parseFloat(cleanNum), prefix, suffix, hasComma, decimals };
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const { num, prefix, suffix, hasComma, decimals } = parsed.current();
          const start = performance.now();
          const ms = duration * 1000;

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / ms, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * num;

            let formatted: string;
            if (decimals > 0) {
              formatted = current.toFixed(decimals);
            } else {
              const rounded = Math.floor(current);
              formatted = hasComma ? rounded.toLocaleString("en-US") : rounded.toString();
            }

            setDisplay(prefix + formatted + suffix);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [duration]);

  return <span ref={ref}>{display}</span>;
};

const achievementsRu = [
  { value: "17%", label: "CTR", icon: "🎯" },
  { value: "50", label: "Гипотез в неделю", icon: "🔍" },
  { value: "2 млрд", label: "Просмотров", icon: "👁️" },
  { value: "78%", label: "Retention", icon: "📈" },
];

const achievementsEn = [
  { value: "17%", label: "CTR", icon: "🎯" },
  { value: "50", label: "Hypotheses / week", icon: "🔍" },
  { value: "2B", label: "Views", icon: "👁️" },
  { value: "78%", label: "Retention", icon: "📈" },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const HeroSection = () => {
  const { lang } = useLang();
  const achievements = lang === "ru" ? achievementsRu : achievementsEn;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="container relative z-10 py-16 md:py-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-center justify-items-center md:justify-items-start">
          <motion.div
            className="col-span-12 md:col-span-7 flex flex-col items-center md:items-start"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full max-w-[400px] md:max-w-[480px]">
              <p className="text-glow-blue font-mono-data text-sm mb-4 tracking-widest uppercase text-center md:text-left">
                Creative Producer<br />
                <span className="text-glow-green">AI-Driven Production &amp; Marketing</span>
              </p>
              <h1 className="text-[clamp(3rem,9vw,6rem)] font-black leading-[0.95] mb-6 text-center md:text-left">
                {lang === "ru" ? "Дарья" : "Daria"}
                <br />
                <span className="text-glow-green">{lang === "ru" ? "Тимакова" : "Timakova"}</span>
              </h1>

              {lang === "ru" ? (
                <div className="mt-6 text-left w-full max-w-[360px] md:max-w-[420px]">
                  <p className="text-foreground text-base min-[430px]:text-lg md:text-xl leading-relaxed mb-4">
                    Оптимизировала продакшен на <span className="text-glow-green font-bold">25%</span>, внедрив AI-инструменты, базу знаний и Data-Driven подход.
                  </p>
                  <p className="text-foreground text-base min-[430px]:text-lg md:text-xl leading-relaxed mb-4">
                    Конвертирую зрителей в игроков. Опыт масштабирования проектов до{" "}
                    <span className="text-glow-blue font-bold">10 млн</span>{" "}
                    подписчиков и <span className="text-glow-blue font-bold">2 млрд</span> просмотров.
                  </p>
                  <p className="text-foreground text-base min-[430px]:text-lg md:text-xl leading-relaxed mb-0">
                    Разработала собственную систему «Hooks &amp; Retention», что увеличило VTR на <span className="text-glow-green font-bold">35%</span>.
                  </p>
                </div>
              ) : (
                <div className="mt-6 text-left w-full max-w-[360px] md:max-w-[420px]">
                  <p className="text-foreground text-base min-[430px]:text-lg md:text-xl leading-relaxed mb-4">
                    Optimised production by <span className="text-glow-green font-bold">25%</span> through AI tools, a knowledge base, and a Data-Driven approach.
                  </p>
                  <p className="text-foreground text-base min-[430px]:text-lg md:text-xl leading-relaxed mb-4">
                    I turn viewers into players. Experience scaling projects to{" "}
                    <span className="text-glow-blue font-bold">10M</span>{" "}
                    subscribers and <span className="text-glow-blue font-bold">2B</span> views.
                  </p>
                  <p className="text-foreground text-base min-[430px]:text-lg md:text-xl leading-relaxed mb-0">
                    Developed my own «Hooks &amp; Retention» system, boosting VTR by <span className="text-glow-green font-bold">35%</span>.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="col-span-12 md:col-span-5 flex justify-center md:justify-end mt-2 md:mt-6 lg:mt-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-primary/10 blur-2xl animate-pulse-glow" />
              <img
                src={dariaAvatar}
                alt="Дарья Тимакова — Креативный Продюсер"
                className="relative w-56 md:w-[420px] rounded-2xl border border-border"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 md:mt-16 space-y-10 md:space-y-12"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {achievements.map((a) => (
              <motion.div
                key={a.label}
                className="relative p-6 md:p-8 text-center cursor-default rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm overflow-hidden group"
                variants={sectionVariants}
                whileHover={{ y: -5, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-primary/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-1 bg-primary/10 blur-xl rounded-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
                <div className="relative z-10">
                  <span className="text-3xl mb-3 block">{a.icon}</span>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-black text-primary font-mono-data text-glow-green whitespace-nowrap">
                    <CountUp target={a.value} />
                  </p>
                  <p className="text-muted-foreground text-base mt-2">{a.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <ClientsStrip />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
