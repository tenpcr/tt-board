import "@/styles/globals.css";
import "./../i18n";
import type { AppProps } from "next/app";
import reduxWrapper from "@/redux/store";
import { appWithTranslation, useTranslation } from "next-i18next";
import { useEffect } from "react";
import { PrimeReactProvider } from "primereact/api";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { ToastContainer, Bounce } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/slices/authSlice";

function App({ Component, pageProps }: AppProps) {
  const value = {
    appendTo: null,
  };

  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = localStorage.getItem("lang");

    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [i18n]);

  useEffect(() => {
    const checkAuth = localStorage.getItem("authentication");
    if (checkAuth === "true") {
      dispatch(setAuth(true));
    } else {
      dispatch(setAuth(false));
    }
  }, [dispatch]);

  return (
    <PrimeReactProvider value={value}>
      <LoadingProvider>
        <Component {...pageProps} />
      </LoadingProvider>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </PrimeReactProvider>
  );
}

export default appWithTranslation(reduxWrapper(App));
