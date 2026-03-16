import { motion } from "framer-motion";
import logoPolybuzz from "@/assets/logo-polybuzz.jpg";
import logoBlockblast from "@/assets/logo-blockblast.png";
import logoQuestionai from "@/assets/logo-questionai.webp";
import logoFacemoji from "@/assets/logo-facemoji.png";

const clients = [
  { name: "BlockBlast", logo: logoBlockblast, className: "w-[72px] h-[72px] min-[430px]:w-20 min-[430px]:h-20 md:w-24 md:h-24" },
  { name: "PolyBuzz", logo: logoPolybuzz, className: "w-[72px] h-[72px] min-[430px]:w-20 min-[430px]:h-20 md:w-24 md:h-24" },
  { name: "Question AI", logo: logoQuestionai, className: "w-[72px] h-[72px] min-[430px]:w-20 min-[430px]:h-20 md:w-24 md:h-24" },
  { name: "FaceMoji", logo: logoFacemoji, className: "w-[72px] h-[72px] min-[430px]:w-20 min-[430px]:h-20 md:w-24 md:h-24" },
  { name: "FishAudio", logo: "/fish-audio-logo.png", className: "w-[72px] h-[72px] min-[430px]:w-20 min-[430px]:h-20 md:w-24 md:h-24" },
];

export const ClientsStrip = () => (
  <div className="w-full">
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-6"
    >
      <p className="text-muted-foreground text-sm font-mono-data tracking-wider uppercase">
        Partnerships
      </p>
      <div className="grid grid-cols-3 md:flex items-center gap-6 md:gap-12 justify-center justify-items-center">
        {clients.map((client) => (
          <div
            key={client.name}
            className="opacity-70 hover:opacity-100 transition-opacity duration-300"
          >
            <img
              src={client.logo}
              alt={client.name}
              className={`${client.className} rounded-xl object-cover`}
            />
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);
