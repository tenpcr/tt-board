import { ComponentType } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useTranslation } from "react-i18next";

function withAuthUser<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithAuthUser = (props: P) => {
    const { t } = useTranslation();
    const { auth: isAuthenticated, loading } = useSelector(
      (state: RootState) => state.auth
    );

    if (loading) {
      return null;
    }

    if (!isAuthenticated) {
      return (
        <div className="flex flex-col w-full h-screen justify-center items-center gap-[20px]">
          <div>
            <img src="/images/logo-black.webp" className="w-[200px]" />
          </div>
          <div className="text-[20px]">
            Please log in before accessing this page.
          </div>
          <div>
            <Link href="/login">
              <button className="text-[14px] text-white px-4 py-2 rounded-[10px] bg-blue-500 hover:bg-blue-600 active:bg-blue-700  transition cursor-pointer">
                {t("login")}
              </button>
            </Link>
          </div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthUser.displayName = `WithAuthUser(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuthUser;
}

export default withAuthUser;
