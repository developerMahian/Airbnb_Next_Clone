import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import FullLogo from "../assets/svg/full-logo.svg";
import HalfLogo from "../assets/svg/half-logo.svg";
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const Header = ({ searchPlaceholder }) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const [guestCount, setGuestCount] = useState(1);

  const calenderRanges = {
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: "selection",
  };
  const [dateRangeState, setDateRangeState] = useState([calenderRanges]);

  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => (inputFocus ? setInputFocus(false) : null);

    if (inputFocus) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  });

  useEffect(() => {
    const handleCalenderClick = (e) => {
      !headerRef.current?.contains(e.target) ? setInputFocus(false) : null;
    };

    window.addEventListener("mousedown", handleCalenderClick);
    return () => window.removeEventListener("mousedown", handleCalenderClick);
  }, [headerRef]);

  const searchHandler = () => {
    setInputFocus(false);

    searchInput
      ? router.push({
          pathname: "/search",
          query: {
            location: searchInput,
            startDate: dateRangeState[0].startDate.toISOString(),
            endDate: dateRangeState[0].endDate.toISOString(),
            guestCount,
          },
        })
      : null;
  };

  return (
    <div
      className="header-wrapper fixed top-0 right-0 left-0 z-20 shadow-md bg-white"
      ref={headerRef}>
      <header>
        <div className="py-3 px-3 md:px-8 h-20 w-full flex justify-between items-center">
          <div className="header__logo text-red-500 hidden md:block">
            <Link href="/">
              <a>
                <FullLogo className="hidden lg:block" />
                <HalfLogo className="lg:hidden block" />
              </a>
            </Link>
          </div>

          <div className="header__search-bar flex-grow md:max-w-[400px] lg:ml-24 flex items-center border-2 shadow-sm hover:shadow transition-shadow rounded-full pr-1.5">
            <form
              className="flex-grow"
              id="headerSearchForm"
              onSubmit={(e) => {
                e.preventDefault();
                searchHandler();
              }}>
              <input
                className={`${
                  searchPlaceholder
                    ? "placeholder:text-gray-400 placeholder:capitalize"
                    : "placeholder:text-black"
                } h-12 w-full outline-none font-semibold pl-4 pr-1 rounded-full cursor-pointer focus:cursor-text text-center md:text-left`}
                id="header-input"
                type="search"
                placeholder={searchPlaceholder || "Where are you going?"}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onClick={() => setInputFocus(true)}
                onFocus={() => setInputFocus(true)}
                onKeyUp={(e) => {
                  e.key === 13 ? alert("shit") : null;
                }}
              />
            </form>
            <button type="submit" form="headerSearchForm">
              <SearchIcon className="h-8 text-white bg-red-500 rounded-full p-2" />
            </button>
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

      <div
        className={`${
          inputFocus ? "scale-100" : "scale-0"
        } absolute top-20 z-10 w-full bg-white shadow-xl origin-top transition-transform duration-300 pb-4 flex justify-center items-center`}
        onClick={() => setInputFocus(true)}>
        <div className="inner-wrapper font-semibold">
          <DateRangePicker
            ranges={dateRangeState}
            minDate={new Date()}
            rangeColors={["#ef4444"]}
            onChange={(item) => setDateRangeState([item.selection])}
          />

          <div className="guest-count flex justify-between items-center border-b mb-2">
            <h2 className="text-xl font-bold">Number of Guests</h2>

            <div className="flex justify-center items-center">
              <UsersIcon className="h-5" />
              <input
                className="w-14 pl-1.5 text-lg text-red-500 outline-none"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                type="number"
                min={1}
              />
            </div>
          </div>

          <div className="flex justify-evenly">
            <button
              className="text-gray-500 hover:bg-gray-100 transition-colors rounded-full py-1 px-4"
              onClick={() => {
                setInputFocus(false);
                setSearchInput("");
                setDateRangeState([calenderRanges]);
                setGuestCount(1);
              }}>
              Reset
            </button>
            <button
              className="text-red-400 hover:bg-red-100 transition-colors rounded-full py-1 px-4"
              onClick={searchHandler}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TransBtn = ({ children, samePadding }) => (
  <div
    className={`font-semibold hover:bg-gray-100 transition-colors duration-200 rounded-full cursor-pointer ${
      samePadding ? "p-2" : "py-2 px-4"
    }`}>
    <Link href="#">
      <a>{children}</a>
    </Link>
  </div>
);

export default Header;
