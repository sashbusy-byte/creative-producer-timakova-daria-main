import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import dariaAvatar from "@/assets/daria-avatar.png";
import { ClientsStrip } from "./ClientsStrip";

interface CountUpProps {
  target: string;
  duration?: number;
}

const CountUp = ({ target, duration = 2 }: CountUpProps) => {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  // Parse target: "2,000+" → num=2000, prefix="", suffix="+", comma=true
  // "2B" → num=2, suffix="B"
  // "78.6%" → num=78.6, suffix="%"
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
            // Ease out cubic
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

const achievements = [
  { value: "2,000+", label: "Гипотез", icon: "🔍" },
  { value: "250+", label: "Креативов", icon: "🎬" },
  { value: "2 млрд", label: "Views", icon: "👁️" },
  { value: "78%", label: "Retention", icon: "📈" },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0 bg-grid opacity-40" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

    <div className="container relative z-10 py-24 md:py-32 max-w-5xl mx-auto">
      <div className="grid grid-cols-12 gap-6 md:gap-8 items-center justify-items-center md:justify-items-start">
        <motion.div
          className="col-span-12 md:col-span-7 text-center md:text-left"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-glow-blue font-mono-data text-sm mb-4 tracking-widest uppercase">
            Creative Producer
          </p>
          <h1 className="text-[clamp(3rem,9vw,6rem)] font-black leading-[0.95] mb-6">
            Дарья
            <br />
            <span className="text-glow-green">Тимакова</span>
          </h1>
          <p className="text-foreground text-base min-[430px]:text-lg md:text-xl max-w-[22rem] md:max-w-[28rem] mx-auto md:mx-0 leading-relaxed mb-4">
            <span className="font-bold uppercase">Россияне были в шоке,</span>{" "}
            когда узнали, что мой проект собрал{" "}
            <span className="text-glow-blue font-bold">59&nbsp;000&nbsp;000</span>{" "}
            органического трафика.
          </p>
          <p className="text-foreground text-base min-[430px]:text-lg md:text-xl max-w-[22rem] md:max-w-[28rem] mx-auto md:mx-0 leading-relaxed">
            Масштабирую идеи через математический подход и AI-автоматизацию.
          </p>
        </motion.div>

        <motion.div
          className="col-span-12 md:col-span-5 flex justify-center md:justify-end"
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
