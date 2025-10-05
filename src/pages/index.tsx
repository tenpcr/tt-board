import HomeFooter from "@/components/home/Footer";
import HomeNavbar from "@/components/home/Navbar";
import Head from "next/head";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { useInView } from "../hooks/useInView";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

function Homepage() {
  const { t } = useTranslation();

  const [ref, isInView] = useInView<HTMLDivElement>({
    threshold: 0.2,
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <div>
      <Head>
        <title>T.T. Board</title>
      </Head>

      <HomeNavbar />

      <div className="bg-gradient-to-b via-white from-orange-50 to-white">
        <div className="w-full">
          <div className="w-[1280px] mx-auto py-[80px] flex justify-center items-center flex-col gap-[10px]">
            <div className="text-[50px] font-bold text-gray-800 leading-[1.3em] text-center">
              <Trans i18nKey={t("main_slogan")}></Trans>
            </div>
            <div className="text-[20px] text-gray-500 font-light">
               <Trans i18nKey={t("sub_slogan")}></Trans>
            </div>
            <div className="mt-[20px]">
              <Link href="/login">
                <button className="flex flex-row gap-[10px] items-center text-[18px] font-light bg-orange-500 text-white px-[30px] py-[12px] rounded-full hover:bg-orange-600 active:bg-orange-700 transition cursor-pointer">
                  {t("get_started")} <FaArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="w-[1280px] mx-auto flex justify-center items-center flex-col gap-[30px]">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img src="/images/home/preview.png" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="w-full bg-orange-50 py-[60px] mt-[80px]">
        <div className="w-[1280px] mx-auto flex justify-center items-center flex-col gap-[30px]">
          <div className="text-[35px] font-bold text-gray-800 leading-[0.9em]">
            {t("try_system_project_name_for_free", {
              system_project_name: t("system_project_name"),
            })}
          </div>
          <div>
            <Link href="/login">
              <button className="flex flex-row gap-[10px] items-center text-[18px] font-light bg-orange-500 text-white px-[30px] py-[12px] rounded-full hover:bg-orange-600 active:bg-orange-700 transition cursor-pointer">
                {t("get_started")} <FaArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <HomeFooter />
    </div>
  );
}

export default Homepage;
