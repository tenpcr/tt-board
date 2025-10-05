import Link from "next/link";
import { useImmer } from "use-immer";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { PulseLoader } from "react-spinners";
import * as helper from "@/utils/helper";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import DropdownLanguage from "@/components/Dropdown/Language";

interface InputDataTypes {
  email: string;
  password: string;
  remember: boolean;
}

interface AlertTypes {
  email: string;
  password: string;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const inputDataDefault: InputDataTypes = {
  email: "admin@tt-ss.net",
  password: "12345678",
  remember: true,
};

const alertDefault: AlertTypes = {
  email: "",
  password: "",
};

function Login() {
  const router = useRouter();
  const { t } = useTranslation();
  const [ref, isInView] = useInView<HTMLDivElement>({
    threshold: 0.2,
  });
  const emailRef = useRef<HTMLInputElement>(null);

  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputData, setInputData] = useImmer<InputDataTypes>(inputDataDefault);
  const [alert, setAlert] = useImmer<AlertTypes>(alertDefault);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  useEffect(() => {
    if (emailRef.current) {
      const input = emailRef.current;
      input.focus();
      const length = input.value.length;
      input.setSelectionRange(length, length);
    }
  }, []);

  const setAletEmail = (text: string) => {
    setAlert((draft) => {
      draft.email = text;
    });
  };

  const setAletPassword = (text: string) => {
    setAlert((draft) => {
      draft.password = text;
    });
  };

  const toLogin = () => {
    setAlert(alertDefault);

    if (!inputData?.email) {
      setAletEmail(t("please_enter_your_email"));
      return;
    } else if (!helper.validateEmail(inputData?.email)) {
      setAletEmail(t("invalid_email_format"));
      return;
    } else if (!inputData?.password) {
      setAletPassword(t("please_enter_your_password"));
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      router.push("/mytasks/todolist");
    }, 2000);
  };

  return (
    <div>
      <Head>
        <title>{t("login")}</title>
      </Head>
      <div className="bg-slate-900 w-full min-h-screen flex flex justify-center items-center p-[50px]">
        <div className="flex flex-col gap-[20px] flex-1 justify-between">
          <section className="w-full flex justify-center">
            <Link href="/">
              <img src="/images/logo-white.svg" className="h-[40px] w-auto" />
            </Link>
          </section>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <section className="flex-1 shrink ">
              <div className="flex flex-col items-center justify-center px-6 py-[20px] mx-auto  ">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-center text-[30px] font-semibold leading-tight tracking-tight text-gray-900 dark:text-white">
                      {t("login")}
                    </h1>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-[15px] font-normal text-gray-900 dark:text-white"
                      >
                        {t("email")}
                      </label>
                      <input
                        ref={emailRef}
                        type="text"
                        name="email"
                        id="email"
                        value={inputData?.email}
                        onChange={(event) => {
                          setInputData((draft) => {
                            draft.email = event.target.value;
                          });
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required
                      />
                      {alert?.email && (
                        <div className="text-[14px] text-[#ea0000] py-[5px]">
                          {alert?.email}
                        </div>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-[15px] font-normaltext-gray-900 dark:text-white"
                      >
                        {t("password")}
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={inputData?.password}
                        onChange={(event) => {
                          setInputData((draft) => {
                            draft.password = event.target.value;
                          });
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                      {alert?.password && (
                        <div className="text-[14px] text-[#ea0000] py-[5px]">
                          {alert?.password}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            checked={inputData?.remember}
                            onChange={(event) => {
                              setInputData((draft) => {
                                draft.remember = event.target.checked;
                              });
                            }}
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="remember"
                            className="text-gray-500 dark:text-gray-300"
                          >
                            {t("remember_me")}
                          </label>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                        <Link href="/forgot">{t("forgot_password_q")}</Link>
                      </span>
                    </div>
                    <button
                      type="submit"
                      onClick={toLogin}
                      disabled={isLoading}
                      className="w-full items-center bg-orange-500 hover:bg-orange-600 active:bg-orange-700 transition text-white py-[13px] px-[15px] rounded text-[14px] cursor-pointer font-medium"
                    >
                      {isLoading ? (
                        <PulseLoader
                          color="#FFFFFF"
                          loading={isLoading}
                          cssOverride={override}
                          size={8}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      ) : (
                        t("login")
                      )}
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      {t("dont_have_an_account_yet_q")}{" "}
                      <Link href="/signup">
                        <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                          {t("sign_up")}
                        </span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>

          <section className="w-full flex justify-center">
            <DropdownLanguage />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Login;
