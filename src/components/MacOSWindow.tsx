import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MacOSWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const windowTransition = { type: "spring" as const, stiffness: 300, damping: 30 };

export const MacOSWindow = ({ title, children, className = "" }: MacOSWindowProps) => (
  <motion.div
    className={`glass-window overflow-hidden ${className}`}
    initial={{ opacity: 0, y: 20, scale: 0.98 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={windowTransition}
  >
    <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
      <div className="macos-dots">
        <div className="macos-dot bg-[hsl(0,70%,55%)]" />
        <div className="macos-dot bg-[hsl(45,90%,55%)]" />
        <div className="macos-dot bg-[hsl(142,70%,50%)]" />
      </div>
      {title && <span className="text-accent text-base font-bold ml-2 font-mono-data">{title}</span>}
    </div>
    <div className="p-4 md:p-4">{children}</div>
  </motion.div>
);
