import Link from "next/link";
import FullLogo from "../assets/svg/full-logo.svg";
import HalfLogo from "../assets/svg/half-logo.svg";
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";

const TransBtn = ({ children, samePadding }) => (
  <div
    className={`btn-transparent font-semibold hover:bg-gray-100 transition-colors duration-200 rounded-full cursor-pointer ${
      samePadding ? "p-2" : "py-2 px-4"
    }`}
  >
    <Link href="#">
      <a>{children}</a>
    </Link>
  </div>
);

const Header = () => (
  <header className="shadow">
    <div className="container mx-auto py-3.5 px-2 flex justify-between items-center">
      <div className="header__logo text-red-500 hidden md:block">
        <Link href="/">
          <a>
            <FullLogo className="hidden lg:block" />
            <HalfLogo className="lg:hidden block" />
          </a>
        </Link>
      </div>

      <div className="header__search-bar flex-grow md:max-w-xs flex items-center border-2 shadow-sm hover:shadow transition-shadow rounded-full p-1.5">
        <input
          className="outline-none font-semibold mx-3 flex-grow placeholder:text-black text-center md:text-left"
          type="search"
          placeholder="Where are you going?"
        />
        <SearchIcon className="h-8 text-white bg-red-500 rounded-full p-2" />
      </div>

      <div className="header__navigation gap-1 hidden md:flex items-center">
        <TransBtn>Become a Host</TransBtn>

        <TransBtn samePadding>
          <GlobeAltIcon className="w-5" />
        </TransBtn>

        <div className="navbar flex gap-1 border shadow-sm hover:shadow-md transition-shadow rounded-full cursor-pointer p-0.5 ml-1">
          <MenuIcon className="w-5 ml-2" />
          <UserCircleIcon className="w-8" />
        </div>
      </div>
    </div>
  </header>
);

export default Header;
