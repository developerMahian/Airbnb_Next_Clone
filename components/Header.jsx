import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import FullLogo from "./SvgAssets/FullLogo";
import HalfLogo from "./SvgAssets/HalfLogo";
// import { fetchApi } from "../../utils/fetchApi";
import { autoCompleteStaticData } from "../StaticData/autoCompleteData";

const Header = ({ searchPlaceholder }) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [inputFocus, setInputFocus] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [suggestionOpen, setSuggestionOpen] = useState(true);
  const [selectedSuggestion, setSelectedSuggestion] = useState({});
  const [searchFilteredData, setSearchFilteredData] = useState([]);
  const [autoCompleteFetchedData, setAutoCompleteFetchedData] = useState(
    autoCompleteStaticData.hits
  );
  // console.log({ searchInput, searchFilteredData, autoCompleteFetchedData });

  const headerRef = useRef(null);
  const searchInputRef = useRef(null);
  const navDropdownRef = useRef(null);
  const suggestionDropdownRef = useRef(null);

  let suggestionData = [];

  if (autoCompleteFetchedData) {
    suggestionData = autoCompleteFetchedData?.map((suggestion) => ({
      locationExternalIDs: suggestion.externalID,
      name: suggestion.name,
    }));
  }

  const calenderRanges = {
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: "selection",
  };
  const [dateRangeState, setDateRangeState] = useState([calenderRanges]);

  /*****
   ** close wide search on scroll..
   *****/
  useEffect(() => {
    const handleScroll = () => (inputFocus ? setInputFocus(false) : null);

    if (inputFocus) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [inputFocus]);

  /*****
   ** close wide search and nav dropdown on outside click...
   *****/
  useEffect(() => {
    const handleCalenderClick = (e) => {
      !headerRef.current?.contains(e.target) && setInputFocus(false);
      !navDropdownRef.current?.contains(e.target) && setDropdownOpen(false);

      !suggestionDropdownRef.current?.contains(e.target) &&
      !searchInputRef.current?.contains(e.target)
        ? setSuggestionOpen(false)
        : null;
    };

    window.addEventListener("mousedown", handleCalenderClick);
    return () => window.removeEventListener("mousedown", handleCalenderClick);
  }, [dropdownOpen, suggestionOpen]);

  /*****
   ** Bayut API autocomplete fetching...
   *****/
  useEffect(() => {
    // searchInput &&
    //   fetchApi(`auto-complete?query=${searchInput}`, true).then((data) =>
    //     setAutoCompleteFetchedData(data?.hits)
    //   );
  }, [searchInput]);

  /*****
   ** Filtering suggetions on search typing...
   *****/
  useEffect(() => {
    const filteredOptions = suggestionData.filter((item) =>
      item?.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
    );

    setSearchFilteredData(filteredOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]); // Shouldn't include suggestionItems

  /*****
   ** Handler for search form submission OR search suggestion choice...
   *****/
  const searchSubmitHandler = () => {
    let yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    console.log("submit");

    if (dateRangeState[0].startDate <= yesterdayDate) {
      alert("You can't choose dates from the Past.");
    } else if (!selectedSuggestion.locationExternalIDs) {
      alert("(Only UAE locations): Please select from Search Suggestions.");
    } else if (searchInput !== selectedSuggestion.name) {
      alert("(Only UAE locations): Please make sure you've typed correctly.");
    } else {
      router.push({
        pathname: "/searchresult",
        query: {
          placeName: selectedSuggestion.name,
          locationExternalIDs: selectedSuggestion.locationExternalIDs,
          startDate: dateRangeState[0].startDate.toISOString(),
          endDate: dateRangeState[0].endDate.toISOString(),
          guestCount,
        },
      });
    }
  };

  return (
    <div
      className="header-wrapper fixed top-0 right-0 left-0 z-20 shadow-md bg-white"
      ref={headerRef}
    >
      <header className="container z-20">
        <div className="py-3 md:px-4 xl:px-8 h-20 w-full flex justify-between items-center">
          <div className="header__logo text-red-500 hidden md:block">
            <Link href="/">
              <a>
                <div className="hidden lg:block">
                  <FullLogo />
                </div>
                <div className="block lg:hidden">
                  <HalfLogo />
                </div>
              </a>
            </Link>
          </div>

          <div className="header__search-bar flex-grow md:max-w-[350px] lg:ml-24 flex items-center border-2 shadow-sm hover:shadow transition-shadow rounded-full pr-1.5">
            <form
              className="flex-grow relative"
              id="headerSearchForm"
              onSubmit={(e) => {
                e.preventDefault();
                searchSubmitHandler();
              }}
            >
              <input
                ref={searchInputRef}
                className={`${searchPlaceholder && "placeholder:capitalize"}
                    placeholder:text-black h-12 w-full outline-none font-semibold pl-6 pr-1 rounded-full cursor-pointer focus:cursor-text text-center md:text-left`}
                id="header-input"
                type="search"
                placeholder={searchPlaceholder || "Where to go in UAE?"}
                autoComplete="off"
                value={searchInput}
                onChange={({ target: { value } }) => setSearchInput(value)}
                onClick={() => setInputFocus(true)}
                onFocus={() => setSuggestionOpen(true)}
                onKeyUp={(e) => {
                  e.key === 13 ? alert("shit") : null;
                }}
              />
              <div
                className={`suggestions-wrapper ${
                  suggestionOpen && searchInput && searchFilteredData.length > 0
                    ? null
                    : "opacity-0 invisible"
                } absolute top-full min-w-[250px] max-h-[450px] bg-white z-20 whitespace-nowrap font-medium rounded-3xl transition-all duration-300 overflow-auto scrollbar-hide p-5`}
                style={{ boxShadow: "0 5px 30px 6px rgb(0 0 0 / .125)" }}
                ref={suggestionDropdownRef}
              >
                {searchFilteredData?.map(
                  (suggestion, index) =>
                    index < 6 && (
                      <div
                        key={index}
                        className="suggestion-item flex items-center gap-4 text-base hover:bg-gray-100 transition-colors duration-300 rounded-xl cursor-pointer whitespace-nowrap p-2 pr-4"
                        onClick={() => {
                          setSearchInput(suggestion.name);
                          setSelectedSuggestion(suggestion);
                          setSuggestionOpen(false);
                        }}
                      >
                        <div className="p-3 bg-gray-200 rounded-xl">
                          <LocationMarkerIcon width={16} />
                        </div>
                        {suggestion.name}
                      </div>
                    )
                )}
              </div>
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
            <div className="dropdown-menu relative" ref={navDropdownRef}>
              <div
                className="dropdown-btn flex gap-1 border shadow-sm hover:shadow-md transition-shadow rounded-full cursor-pointer p-0.5 ml-1"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <MenuIcon className="w-5 ml-2" />
                <UserCircleIcon className="w-8" />
              </div>
              <div
                className={`${
                  !dropdownOpen && "opacity-0 invisible"
                } dropdown-content absolute top-[calc(100%+12px)] right-0 min-w-[225px] bg-white z-20 whitespace-nowrap font-medium rounded-xl transition-all duration-300 overflow-hidden py-2`}
                style={{ boxShadow: "0 5px 30px 6px rgb(0 0 0 / .125)" }}
              >
                <DropdownItem>Sign Up</DropdownItem>
                <DropdownItem>Login</DropdownItem>
                <hr className="my-2" />
                <DropdownItem>Host your Home</DropdownItem>
                <DropdownItem>Live your Dreams</DropdownItem>
                <DropdownItem>Help</DropdownItem>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`${
          inputFocus ? "scale-100" : "scale-0"
        } absolute top-20 z-10 w-full bg-white shadow-xl origin-top transition-transform duration-300 pb-4 flex justify-center items-center`}
        onClick={() => setInputFocus(true)}
      >
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
              }}
            >
              Reset
            </button>
            <button
              className="text-red-400 hover:bg-red-100 transition-colors rounded-full py-1 px-4"
              onClick={searchSubmitHandler}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DropdownItem = ({ children }) => (
  <div className="px-4 py-2 hover:bg-gray-100 transition-colors cursor-pointer">
    {children}
  </div>
);

const TransBtn = ({ children, samePadding }) => (
  <div
    className={`font-semibold hover:bg-gray-100 transition-colors duration-200 rounded-full cursor-pointer ${
      samePadding ? "p-2" : "py-2 px-4"
    }`}
  >
    {children}
  </div>
);

export default Header;
