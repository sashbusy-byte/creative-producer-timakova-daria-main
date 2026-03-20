import { motion } from "framer-motion";
import { useLang } from "@/lib/lang";

const sectionAnim = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

type Pill = { label: string };

const groupsRu: Array<{ title: string; accent: "green" | "blue"; pills: Pill[] }> = [
  {
    title: "Analytics",
    accent: "green",
    pills: [
      { label: "Facebook Ad Library" },
      { label: "YouTube Analytics" },
      { label: "Viewstats" },
      { label: "VidIQ" },
      { label: "AppMagic" },
      { label: "Sensor Tower" },
      { label: "Trend Hunting" },
    ],
  },
  {
    title: "AI & Stack",
    accent: "blue",
    pills: [
      { label: "Gemini" },
      { label: "Nano Banana" },
      { label: "Sora" },
      { label: "Veo3" },
      { label: "Suno" },
      { label: "ElevenLabs" },
      { label: "Zonos" },
      { label: "Antigravity" },
      { label: "Midjourney" },
      { label: "Adobe Premier Pro" },
      { label: "Photoshop" },
      { label: "Figma" },
      { label: "Canva" },
      { label: "Blender" },
    ],
  },
  {
    title: "Management",
    accent: "green",
    pills: [
      { label: "Google Project Management" },
      { label: "Agile" },
      { label: "Scrum" },
      { label: "Jira" },
      { label: "Miro" },
      { label: "Asana" },
      { label: "Google Workspace" },
    ],
  },
];

// Groups are the same in EN (all labels are already in English)
const groupsEn = groupsRu;

const pillClasses = (accent: "green" | "blue") =>
  accent === "green"
    ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15"
    : "bg-accent/10 text-accent border-accent/20 hover:bg-accent/15";

export const ExpertiseSection = () => {
  const { lang } = useLang();
  const groups = lang === "ru" ? groupsRu : groupsEn;

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
            Skills &amp; <span className="text-glow-green">Stack</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionAnim}
              transition={{ delay: 0.08 + i * 0.08 }}
              className="glass-card p-7"
            >
              <div className="mb-5">
                <p className="text-foreground font-bold text-lg">{g.title}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.pills.map((p) => (
                  <span
                    key={p.label}
                    className={[
                      "inline-flex items-center min-h-11 px-3 rounded-full border text-sm font-mono-data transition-colors select-none",
                      pillClasses(g.accent),
                    ].join(" ")}
                  >
                    {p.label}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
