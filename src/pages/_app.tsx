import "@/styles/globals.css";
import "./../i18n";
import type { AppProps } from "next/app";
import { appWithTranslation, useTranslation } from "next-i18next";
import { useEffect } from "react";
import { PrimeReactProvider } from "primereact/api";

function App({ Component, pageProps }: AppProps) {
  const value = {
    appendTo: null,
  };
  
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = localStorage.getItem("lang");

    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [i18n]);

  return (
    <PrimeReactProvider value={value}>
      <Component {...pageProps} />
    </PrimeReactProvider>
  );
}

export default appWithTranslation(App);
