import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";

import { addDays } from "date-fns";
import { useQuery } from "react-query";
import { DateRangePicker } from "react-date-range";
import ReactLoading from "react-loading";
import propTypes from "prop-types";

import { fetchApi } from "../../utils/fetchApi";
import useDebounce from "../../utils/useDebounce";

import RightMenu from "./component/RightMenu";

import FullLogo from "../SvgAssets/FullLogo";
import HalfLogo from "../SvgAssets/HalfLogo";
import { LocationMarkerIcon } from "@heroicons/react/outline";
import { SearchIcon, UsersIcon } from "@heroicons/react/solid";

import "react-date-range/dist/styles.css"; // date-range main style
import "react-date-range/dist/theme/default.css"; // date-range theme

// import { autoCompleteStaticData } from "../../StaticData/autoCompleteData";

const Header = ({ searchPlaceholder }) => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebounce(searchInput);

  const [minimizeHeader, setMinimizeHeader] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [inputFocus, setInputFocus] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [suggestionOpen, setSuggestionOpen] = useState(true);
  const [selectedSuggestion, setSelectedSuggestion] = useState({});

  const headerRef = useRef(null);
  const searchInputRef = useRef(null);
  const navDropdownRef = useRef(null);
  const suggestionDropdownRef = useRef(null);

  const router = useRouter();

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
    const handleScroll = () => {
      inputFocus ? setInputFocus(false) : null;

      setMinimizeHeader(window.scrollY > 150);
    };

    // handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [inputFocus]);

  /*****
   ** close wide search and nav dropdown on outside click...
   *****/
  useEffect(() => {
    const handleCalenderClick = (e) => {
      if (!headerRef.current?.contains(e.target)) setInputFocus(false);
      if (!navDropdownRef.current?.contains(e.target)) setDropdownOpen(false);

      if (
        !suggestionDropdownRef.current?.contains(e.target) &&
        !searchInputRef.current?.contains(e.target)
      ) {
        setSuggestionOpen(false);
      }
    };

    window.addEventListener("mousedown", handleCalenderClick);
    return () => window.removeEventListener("mousedown", handleCalenderClick);
  }, [dropdownOpen, suggestionOpen]);

  /*****
   ** Bayut API autocomplete fetching...
   *****/
  const { data, isLoading } = useQuery(
    ["headerSearch", debouncedSearchInput],
    () =>
      fetchApi(`/auto-complete?query=${debouncedSearchInput}&hitsPerPage=6`),
    {
      enabled:
        debouncedSearchInput.length > 0 &&
        selectedSuggestion?.name !== searchInput,
      staleTime: Infinity,
    }
  );
  data?.hits && console.log({ data });

  let suggestionData = [];

  if (searchInput && !isLoading) {
    suggestionData = data?.hits?.map((suggestion) => ({
      locationExternalIDs: suggestion.externalID,
      name: suggestion.name,
    }));
  }

  /*****
   ** Handler for search form submission OR search suggestion choice...
   *****/
  const searchSubmitHandler = () => {
    if (!selectedSuggestion.locationExternalIDs) {
      alert("Select from Search Suggestions please.");
    } else if (searchInput !== selectedSuggestion.name) {
      alert("Make sure you've typed exactly like suggested.");
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
    <header
      className="fixed top-0 right-0 left-0 z-20 shadow-md bg-white"
      ref={headerRef}
    >
      <div className="container z-20">
        <div
          className={`${
            minimizeHeader ? "h-14" : "h-20"
          } md:px-4 xl:px-8 w-full flex justify-between items-center duration-300`}
          style={{ transitionProperty: "height" }}
        >
          <div className="header__logo relative text-red-500 hidden md:block">
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
                className={`${searchPlaceholder && "placeholder:capitalize"} ${
                  minimizeHeader ? "h-10" : "h-12"
                }
                      placeholder:text-black w-full outline-none font-semibold pl-6 pr-1 rounded-full cursor-pointer focus:cursor-text text-center md:text-left`}
                id="header-input"
                type="search"
                placeholder={
                  searchPlaceholder || "Where to go in Arab Emirates?"
                }
                autoComplete="off"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                onClick={() => setInputFocus(true)}
                onFocus={() => setSuggestionOpen(true)}
                onKeyUp={(e) => {
                  e.key === 13 ? alert("shit") : null;
                }}
              />
              <div
                className={`${
                  suggestionData?.length > 0 && suggestionOpen
                    ? null
                    : "opacity-0 invisible"
                } absolute top-full min-w-[250px] maxh-[450px] bg-white z-20 whitespace-nowrap font-medium rounded-3xl transition-all duration-300 overflow-auto scrollbar-hide p-5`}
                style={{ boxShadow: "0 5px 30px 6px rgb(0 0 0 / .125)" }}
                ref={suggestionDropdownRef}
              >
                {suggestionData?.map((suggestion, index) => (
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
                ))}
              </div>
            </form>
            {isLoading ? (
              <ReactLoading
                type="bubbles"
                color="#ef4444"
                height="40px"
                width="40px"
              />
            ) : (
              <button type="submit" form="headerSearchForm">
                <SearchIcon className="h-8 text-white bg-red-500 hover:scale-105 transition-transform rounded-full p-2" />
              </button>
            )}
          </div>

          <RightMenu
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            navDropdownRef={navDropdownRef}
          />
        </div>
      </div>

      <div
        className={`${inputFocus ? "scale-100" : "scale-0"} absolute ${
          minimizeHeader ? "top-14" : "top-20"
        } z-10 w-full bg-white shadow-xl origin-top transition-transform duration-300 pb-4 flex justify-center items-center`}
      >
        <div className="inner-wrapper font-semibold max-w-full">
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
    </header>
  );
};

Header.propTypes = {
  searchPlaceholder: propTypes.string,
};

export default Header;
