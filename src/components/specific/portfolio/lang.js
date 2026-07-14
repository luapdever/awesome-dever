import { createContext, useContext } from "react";
import { STR } from "../../../rawDatas/i18n";

export const LangContext = createContext({ lang: "en", setLang: () => {} });

export const useLang = () => {
  const { lang, setLang } = useContext(LangContext);
  return { lang, setLang, t: STR[lang] || STR.en };
};
