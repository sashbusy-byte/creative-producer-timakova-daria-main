import { motion } from "framer-motion";
import { MacOSWindow } from "./MacOSWindow";
import { Copy, FileText, Linkedin, Mail, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

async function copyToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    // Fallback for older browsers / denied permissions
    try {
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export const ContactSection = () => (
  <section className="py-12 md:py-20">
    <div className="container max-w-2xl">
      <MacOSWindow title="open_comms.sh">
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-black mb-2">
            <span className="text-glow-green">Collaborate?</span>
          </h2>
          <p className="text-muted-foreground mb-8 text-sm tracking-wide uppercase">
            Open to Remote or Relocation
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 text-left">
            {/* Telegram */}
            <a
              href="https://t.me/lil_duda"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card group flex items-center justify-between gap-4 px-4 py-3 rounded-xl border border-border hover:border-primary/40 transition-colors"
              aria-label="Открыть Telegram"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Send className="w-5 h-5 text-primary" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground font-mono-data uppercase tracking-wider">Telegram</p>
                  <p className="text-foreground font-semibold select-text break-all">@lil_duda</p>
                </div>
              </div>
              <span className="h-9 px-3 inline-flex items-center justify-center rounded-lg border border-primary/40 text-xs font-mono-data text-primary/90 bg-background/40 group-hover:bg-primary/15 transition-colors flex-shrink-0">
                Open
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:trofimova200@gmail.com"
              className="glass-card group flex items-center justify-between gap-4 px-4 py-3 rounded-xl border border-border hover:border-accent/40 transition-colors"
              aria-label="Написать email"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="h-11 w-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground font-mono-data uppercase tracking-wider">Email</p>
                  <p className="text-foreground font-semibold select-text break-all">trofimova200@gmail.com</p>
                </div>
              </div>

              <button
                type="button"
                className="h-9 w-9 inline-flex items-center justify-center rounded-lg bg-background/40 border border-border/60 hover:bg-background/60 transition-colors flex-shrink-0"
                aria-label="Скопировать email"
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const ok = await copyToClipboard("trofimova200@gmail.com");
                  toast({
                    title: ok ? "Скопировано" : "Не удалось скопировать",
                    description: ok ? "Email скопирован в буфер обмена." : "Скопируйте вручную: trofimova200@gmail.com",
                  });
                }}
              >
                <Copy className="w-4 h-4 text-foreground" />
              </button>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/daria-timakova-creative-producer/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card group flex items-center justify-between gap-4 px-4 py-3 rounded-xl border border-border hover:border-primary/40 transition-colors"
              aria-label="Открыть LinkedIn профиль"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Linkedin className="w-5 h-5 text-primary" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground font-mono-data uppercase tracking-wider">LinkedIn</p>
                  <p className="text-foreground font-semibold select-text break-all">LinkedIn Profile</p>
                </div>
              </div>
              <span className="h-9 px-3 inline-flex items-center justify-center rounded-lg border border-primary/40 text-xs font-mono-data text-primary/90 bg-background/40 group-hover:bg-primary/15 transition-colors flex-shrink-0">
                Open
              </span>
            </a>

            {/* Resume */}
            <a
              href="https://cv2you.com/ru/resume/Q4u7/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card group flex items-center justify-between gap-4 px-4 py-3 rounded-xl border border-border hover:border-primary/40 transition-colors"
              aria-label="Открыть резюме"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="h-11 w-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground font-mono-data uppercase tracking-wider">Резюме</p>
                  <p className="text-foreground font-semibold select-text break-all">View Resume</p>
                </div>
              </div>
              <span className="h-9 px-3 inline-flex items-center justify-center rounded-lg border border-primary/40 text-xs font-mono-data text-primary/90 bg-background/40 group-hover:bg-primary/15 transition-colors flex-shrink-0">
                Open
              </span>
            </a>
          </div>
        </motion.div>
      </MacOSWindow>
    </div>
  </section>
);
