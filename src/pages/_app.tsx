import "@/styles/globals.css";
import "./../i18n";
import type { AppProps } from "next/app";
import { appWithTranslation, useTranslation } from "next-i18next";
import { useEffect } from "react";

function App({ Component, pageProps }: AppProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = localStorage.getItem("lang");

    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [i18n]);

  return <Component {...pageProps} />;
}

export default appWithTranslation(App);
