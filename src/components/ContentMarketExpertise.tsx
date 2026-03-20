import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";
import podlojkaAi from "@/assets/podlojka_ai.JPG";
import podlojkaGames from "@/assets/podlojka_games.JPG";
import podlojkaKids from "@/assets/podlojka_kids.JPG";
import podlojkaSocial from "@/assets/podlojka_social.JPG";

const sectionAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const cardsRu = [
  {
    title: "GenAI Solutions",
    accent: "blue" as const,
    bg: podlojkaAi,
    text: "Продвижение AI-продуктов: GenAI-чатботы, голосовые AI-движки, инструменты кастомизации (PolyBuzz, Question AI, Fish Audio, FaceMoji).",
  },
  {
    title: "Gaming",
    accent: "green" as const,
    bg: podlojkaGames,
    text: "Глубокая насмотренность в жанрах Casual, Match-3, Midcore, RP, Sandbox.",
  },
  {
    title: "Kids & Family",
    accent: "green" as const,
    bg: podlojkaKids,
    text: "Эксперт в создании безопасного и вовлекающего детского контента.",
  },
  {
    title: "Social Media",
    accent: "blue" as const,
    bg: podlojkaSocial,
    text: "Понимание алгоритмов YouTube / TikTok / Instagram для быстрого масштабирования проектов.",
  },
];

const cardsEn = [
  {
    title: "GenAI Solutions",
    accent: "blue" as const,
    bg: podlojkaAi,
    text: "Promoting AI products: GenAI chatbots, voice AI engines, customisation tools (PolyBuzz, Question AI, Fish Audio, FaceMoji).",
  },
  {
    title: "Gaming",
    accent: "green" as const,
    bg: podlojkaGames,
    text: "Deep domain knowledge across Casual, Match-3, Midcore, RP, and Sandbox genres.",
  },
  {
    title: "Kids & Family",
    accent: "green" as const,
    bg: podlojkaKids,
    text: "Expert in creating safe and engaging content for children and families.",
  },
  {
    title: "Social Media",
    accent: "blue" as const,
    bg: podlojkaSocial,
    text: "Understanding of YouTube / TikTok / Instagram algorithms for rapid project scaling.",
  },
];

export const ContentMarketExpertise = () => {
  const { lang } = useLang();
  const cards = lang === "ru" ? cardsRu : cardsEn;

  return (
    <section className="py-12 md:py-20">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionAnim}
          className="mb-12 max-w-3xl"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-8">
            Content &amp; Market <span className="text-glow-green">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionAnim}
              transition={{ delay: 0.08 + i * 0.08 }}
              className="glass-card p-7 relative overflow-hidden group min-h-[160px] flex flex-col justify-end"
            >
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110"
                style={{ 
                  backgroundImage: `url(${card.bg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-background/80 z-10 backdrop-blur-[2px] group-hover:bg-background/70 transition-colors duration-300" />

              <div className="relative z-20">
                <p className={`font-bold text-lg mb-2 ${card.accent === "green" ? "text-primary" : "text-accent"}`}>
                  {card.title}
                </p>
                <p className="text-secondary-foreground text-sm leading-relaxed">{card.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
