import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "ru" | "en";

interface LangContextValue {
  lang: Lang;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue>({ lang: "ru", toggle: () => {} });

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("ru");
  const toggle = () => setLang((l) => (l === "ru" ? "en" : "ru"));
  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>;
};

export const useLang = () => useContext(LangContext);
