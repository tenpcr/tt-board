import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { PulseLoader } from "react-spinners";
import { useImmer } from "use-immer";
import * as helper from "@/utils/helper";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import DropdownLanguage from "../components/dropdown/Language"

interface InputDataTypes {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface AlertTypes {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirm_password: string;
}

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const inputDataDefault: InputDataTypes = {
  firstname: "T.T. Software",
  lastname: "Solution",
  email: "admin@tt-ss.net",
  password: "12345678",
  confirm_password: "12345678",
};

const alertDefault: AlertTypes = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirm_password: "",
};

function Signup() {
  const router = useRouter();
  const { t } = useTranslation();
  const [ref, isInView] = useInView<HTMLDivElement>({
    threshold: 0.2,
  });
  const firstnameRef = useRef<HTMLInputElement>(null);

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
    if (firstnameRef.current) {
      const input = firstnameRef.current;
      input.focus();
      const length = input.value.length;
      input.setSelectionRange(length, length);
    }
  }, []);

  const setAlertFirstName = (text: string) => {
    setAlert((draft) => {
      draft.firstname = text;
    });
  };

  const setAlertLastName = (text: string) => {
    setAlert((draft) => {
      draft.lastname = text;
    });
  };

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

  const setAletConfirmPassword = (text: string) => {
    setAlert((draft) => {
      draft.confirm_password = text;
    });
  };

  const toSignup = () => {
    setAlert(alertDefault);

    if (!inputData?.firstname) {
      setAlertFirstName(t("please_enter_your_first_name"));
      return;
    } else if (!inputData?.lastname) {
      setAlertLastName(t("please_enter_your_last_name"));
      return;
    } else if (!inputData?.email) {
      setAletEmail(t("please_enter_your_email"));
      return;
    } else if (!helper.validateEmail(inputData?.email)) {
      setAletEmail(t("invalid_email_format"));
      return;
    } else if (!inputData?.password) {
      setAletPassword(t("please_enter_your_password"));
      return;
    } else if (!inputData?.confirm_password) {
      setAletConfirmPassword(t("please_re_enter_your_password"));
      return;
    } else if (inputData?.password !== inputData?.confirm_password) {
      setAletPassword(t("passwords_do_not_match"));
      setAletConfirmPassword(t("passwords_do_not_match"));
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  };

  return (
    <div>
      <Head>
        <title>{t("sign_up")}</title>
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
                      {t("sign_up")}
                    </h1>

                    <div>
                      <label
                        htmlFor="firstname"
                        className="block mb-2 text-[15px] font-normal text-gray-900 dark:text-white"
                      >
                        {t("first_name")}
                      </label>
                      <input
                        ref={firstnameRef}
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={inputData?.firstname}
                        onChange={(event) => {
                          setInputData((draft) => {
                            draft.firstname = event.target.value;
                          });
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {alert?.firstname && (
                        <div className="text-[14px] text-[#ea0000] py-[5px]">
                          {alert?.firstname}
                        </div>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lastname"
                        className="block mb-2 text-[15px] font-normal text-gray-900 dark:text-white"
                      >
                        {t("last_name")}
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={inputData?.lastname}
                        onChange={(event) => {
                          setInputData((draft) => {
                            draft.lastname = event.target.value;
                          });
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                      {alert?.lastname && (
                        <div className="text-[14px] text-[#ea0000] py-[5px]">
                          {alert?.lastname}
                        </div>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-[15px] font-normal text-gray-900 dark:text-white"
                      >
                        {t("email")}
                      </label>
                      <input
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

                    <div>
                      <label
                        htmlFor="confirm_password"
                        className="block mb-2 text-[15px] font-normaltext-gray-900 dark:text-white"
                      >
                        {t("confirm_password")}
                      </label>
                      <input
                        type="password"
                        name="confirm password"
                        id="confirm_password"
                        value={inputData?.confirm_password}
                        onChange={(event) => {
                          setInputData((draft) => {
                            draft.confirm_password = event.target.value;
                          });
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                      {alert?.confirm_password && (
                        <div className="text-[14px] text-[#ea0000] py-[5px]">
                          {alert?.confirm_password}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      onClick={toSignup}
                      className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 transition text-white py-[13px] px-[15px] rounded text-[14px] cursor-pointer font-medium"
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
                        t("sign_up")
                      )}
                    </button>
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

export default Signup;
