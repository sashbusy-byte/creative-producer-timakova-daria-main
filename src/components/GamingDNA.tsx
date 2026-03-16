import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import gameTilesSurvive from "@/assets/game-tiles-survive.png";
import gameCandyCrush from "@/assets/game-candy-crush.webp";
import gameRoyalMatch from "@/assets/game-royal-match.png";
import gameFishdom from "@/assets/game-fishdom.png";
import gameLastDay from "@/assets/game-last-day.jpg";
import gameMinecraft from "@/assets/game-minecraft.webp";
import gameRoblox from "@/assets/game-roblox.jpg";

const games = [
  { name: "Tiles Survive", img: gameTilesSurvive, note: "Retention: 90+ дней. Механизмы долгосрочного удержания в mid-core.", tag: "Mid-core" },
  { name: "Candy Crush", img: gameCandyCrush, note: "Визуальные фидбеки, темп и маркетинговые «крючки».", tag: "Casual" },
  { name: "Royal Match", img: gameRoyalMatch, note: "Стратегия креативов и UGC-кампаний — лидер UA в match-3.", tag: "Casual" },
  { name: "Fishdom", img: gameFishdom, note: "Мета-геймплей + эмоциональная привязка — retention Playrix.", tag: "Casual" },
  { name: "Last Day on Earth", img: gameLastDay, note: "Баланс сложности и монетизация через вовлечение.", tag: "Survival" },
  { name: "Roblox", img: gameRoblox, note: "UGC-экосистема, вирусные механики и тренды молодой аудитории.", tag: "UGC & Viral" },
  { name: "Minecraft", img: gameMinecraft, note: "Культурный код и тренды — от Brainrot до масштабных ивентов.", tag: "UGC & Viral" },
];

export const GamingDNA = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 200;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-32">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 space-y-4"
        >
          <p className="text-accent font-mono-data text-sm mb-2 tracking-widest uppercase">Gaming DNA</p>
          <h2 className="text-3xl md:text-5xl font-black">
            Play to <span className="text-glow-green">Analyze</span>
          </h2>
          <p className="text-secondary-foreground text-base md:text-lg max-w-3xl">
            Изучаю механику, retention и маркетинговые «крючки» топовых проектов, чтобы декомпозировать их успех и
            применять лучшие практики в своих креативах.
          </p>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4"
        >
          {games.map((game, i) => (
            <motion.div
              key={game.name}
              className="relative group cursor-default snap-start flex-shrink-0 w-[140px] md:w-[160px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative rounded-xl overflow-hidden aspect-square">
                <img
                  src={game.img}
                  alt={game.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-50 group-hover:opacity-90 transition-opacity duration-300" />

                <span className="absolute top-1.5 right-1.5 text-[9px] font-mono-data text-accent bg-background/70 backdrop-blur-sm px-1.5 py-0.5 rounded-full border border-accent/20">
                  {game.tag}
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <p className="text-foreground font-bold text-xs mb-0.5">{game.name}</p>
                  <p className={`text-muted-foreground text-[10px] leading-snug transition-all duration-300 ${hovered === i ? "opacity-100 max-h-16" : "opacity-0 max-h-0"} overflow-hidden`}>
                    {game.note}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
