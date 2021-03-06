import { useState, useRef, useEffect } from "react";
import Head from "next/head";

import { Header, PlaceCard, MapComponent, Footer } from "../components";

import { parseISO } from "date-fns";
import { fetchApi } from "../utils/fetchApi";

import { ArrowCircleLeftIcon, MapIcon } from "@heroicons/react/solid";

// import {
//   propertiesRentalData,
//   propertiesForSaleData,
// } from "../StaticData/propertyList";

const SearchResultPage = ({
  propertiesRentalData,
  propertiesForSaleData,
  query: { placeName, startDate, endDate, guestCount },
}) => {
  const [filteredData, setFilteredData] = useState([]);
  const [propertyPurpose, setPropertyPurpose] = useState("all");

  const mobileMapBtnRef = useRef(null);
  const leftSectionRef = useRef(null);
  const sectionHideIconRef = useRef(null);
  const sectionMapRef = useRef(null);
  const footerRef = useRef(null);

  const allPropertiesData = [...propertiesForSaleData, ...propertiesRentalData];

  const fullMapWidth = (mobileParam) => {
    const hidingClasses = ["-translate-x-[200vw]", "!p-0", "!w-0"];

    sectionHideIconRef.current?.classList.toggle("rotate-180");

    setTimeout(() => {
      hidingClasses.forEach((className) => {
        leftSectionRef.current?.classList.toggle(className);
      });

      if (mobileParam) {
        sectionMapRef.current?.classList.toggle("!w-full");
        footerRef.current?.classList.toggle("hidden");
        mobileMapBtnRef.current?.classList.toggle("hidden");
      }
    }, 100);
  };

  useEffect(() => {
    switch (propertyPurpose) {
      case "all":
        setFilteredData(allPropertiesData);
        break;

      case "for-rent":
        setFilteredData(propertiesRentalData);
        break;

      case "for-sale":
        setFilteredData(propertiesForSaleData);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyPurpose]);

  const parsingDate = (date, withOutYear = true) => {
    const dateObj = parseISO(date);

    let mm = dateObj.toLocaleString("default", { month: "long" });
    let dd = dateObj.getDate();

    dd < 10 ? (dd = "0" + dd) : null;

    return dd + " " + mm + (withOutYear ? " " + dateObj.getFullYear() : "");
  };

  const dateRange = `${parsingDate(startDate)}  -  ${parsingDate(endDate)}`;

  const dateRangeNoYear = `${parsingDate(startDate, false)}  -  ${parsingDate(
    endDate,
    false
  )}`;

  return (
    <>
      <Head>
        <title>Search Places</title>
        <meta
          name="description"
          content="Search and view your favourite Destinations"
        />
      </Head>

      <Header
        searchPlaceholder={`${placeName}   |   ${dateRangeNoYear}   |   ${guestCount} guests`}
      />

      <main className="flex mb-10 min-h-[calc(100vh-225px)]">
        <button
          ref={mobileMapBtnRef}
          className="mobile-show-map md:hidden fixed top-[92%] left-1/2 translate-[-50%, -50%] w-24 -ml-12 font-bold text-white bg-gray-800 py-2 rounded-full opacity-80 hover:opacity-100 hover:scale-95 transition-all z-20"
          onClick={() => fullMapWidth(true)}
        >
          Map
          <MapIcon className="h-5 inline ml-1.5" />
        </button>

        <section
          ref={leftSectionRef}
          className="flex flex-col origin-left w-full h-full md:w-3/4 transition-all duration-500 overflow-hidden mt-28 sm:px-3"
        >
          <div className="top-content pl-2">
            <div className="top-info text-sm font-medium mb-2">
              <span className="text-[15px] font-bold">
                {filteredData.length}+
              </span>{" "}
              stays - {dateRange} - for {guestCount} guests
            </div>
            <h1 className="text-3xl font-extrabold mb-4">
              Stays in <span className="capitalize">{placeName}</span>
            </h1>

            <div className="filters flex flex-wrap gap-3 mb-4">
              {propertyPurpose !== "all" && (
                <FilterBtn onFilterClick={() => setPropertyPurpose("all")}>
                  Both Rental and On-Sale
                </FilterBtn>
              )}

              {propertyPurpose !== "for-rent" && (
                <FilterBtn onFilterClick={() => setPropertyPurpose("for-rent")}>
                  For Rent
                </FilterBtn>
              )}

              {propertyPurpose !== "for-sale" && (
                <FilterBtn onFilterClick={() => setPropertyPurpose("for-sale")}>
                  For Sale
                </FilterBtn>
              )}
            </div>
          </div>

          {filteredData?.map((propObj, index) => (
            <PlaceCard key={index} placeName={placeName} {...propObj} />
          ))}
        </section>

        <section
          ref={sectionMapRef}
          className="flex relative w-0 h-full md:w-1/4 md:min-w-[400px] xl:min-w-[600px] transition-all mt-20 bg-gray-200"
        >
          <div className="w-full h-[calc(100vh-80px)] fixed">
            <button
              className="absolute left-[7px] top-[10px] bg-white rounded-md px- p-1.5 z-20 active:scale-125 transition-transform duration-300"
              onClick={fullMapWidth}
            >
              <ArrowCircleLeftIcon
                ref={sectionHideIconRef}
                className="w-6 transition-transform duration-500"
              />
            </button>

            {filteredData[0]?.geography?.lng && (
              <MapComponent placesData={filteredData} />
            )}
          </div>
        </section>
      </main>

      <div ref={footerRef} className="block md:hidden">
        <Footer />
      </div>
    </>
  );
};

const FilterBtn = ({ children, onFilterClick }) => (
  <button
    className="inline-block px-3 py-1 border rounded-full font-medium whitespace-nowrap hover:shadow-md active:bg-gray-100 active:scale-95 transition"
    onClick={onFilterClick}
  >
    {children}
  </button>
);

export async function getServerSideProps({ query }) {
  const forRent = await fetchApi(
    `/properties/list?locationExternalIDs=${query?.locationExternalIDs}&purpose=for-rent`
  );

  const forSale = await fetchApi(
    `/properties/list?locationExternalIDs=${query?.locationExternalIDs}&purpose=for-sale`
  );

  return {
    props: {
      propertiesRentalData: forRent?.hits,
      propertiesForSaleData: forSale?.hits,
      query,
    },
  };
}

export default SearchResultPage;
