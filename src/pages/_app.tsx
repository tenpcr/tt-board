import "@/styles/globals.css";
import "./../i18n";
import type { AppProps } from "next/app";
import reduxWrapper from "@/redux/store";
import { appWithTranslation, useTranslation } from "next-i18next";
import { useEffect } from "react";
import { PrimeReactProvider } from "primereact/api";
import { LoadingProvider } from "@/contexts/LoadingContext";

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
      <LoadingProvider>
        <Component {...pageProps} />
      </LoadingProvider>
    </PrimeReactProvider>
  );
}

export default appWithTranslation(reduxWrapper(App));
