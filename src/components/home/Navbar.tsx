import Link from "next/link";

function HomeNavbar() {
  return (
    <div className="w-full shadow-md py-[15px]">
      <nav className="w-[1280px] mx-auto flex justify-between items-center">
        <div className="text-[22px] font-semibold">
          <Link href="/">
            <img src="/images/logo-black.svg" className="h-[30px] w-auto" />
          </Link>
        </div>
        <div className="flex gap-[10px]">
          <Link href="/login">
            <button className="text-[14px] border-1 border-orange-500 text-gray-600 px-4 py-2 rounded-full hover:bg-orange-600 active:bg-orange-700 hover:text-white transition cursor-pointer">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="text-[14px] bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 active:bg-orange-700 transition cursor-pointer">
              Sign up
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default HomeNavbar;
