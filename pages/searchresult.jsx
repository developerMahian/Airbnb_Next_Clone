import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { parseISO } from "date-fns";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PlaceCard from "../components/PlaceCard";
import MapComponent from "../components/Map";
import { ArrowCircleLeftIcon, MapIcon } from "@heroicons/react/solid";
// import { fetchApi } from "../utils/fetchApi";
import { rentalList, forSaleList } from "../StaticData/propertyList";

const SearchResultPage = () => {
  const [propertiesRentalData, setPropertiesRentalData] = useState(rentalList);
  const [propertiesForSaleData, setPropertiesForSaleData] =
    useState(forSaleList);
  const [allPropertiesData, setAllPropertiesData] = useState([
    ...propertiesForSaleData,
    ...propertiesRentalData,
  ]);
  const [placesData, setPlacesData] = useState([]);
  const [propertyPurpose, setPropertyPurpose] = useState("all");

  const mobileMapBtnRef = useRef(null);
  const leftSectionRef = useRef(null);
  const sectionHideIconRef = useRef(null);
  const sectionMapRef = useRef(null);
  const footerRef = useRef(null);

  const router = useRouter();
  const { placeName, locationExternalIDs, startDate, endDate, guestCount } =
    router.query;

  useEffect(() => {
    // fetchApi(
    //   `properties/list?locationExternalIDs=${locationExternalIDs}&purpose=for-rent`,
    //   false
    // ).then(({ hits }) => setPropertiesRentalData(hits));
    // fetchApi(
    //   `properties/list?locationExternalIDs=${locationExternalIDs}&purpose=for-sale`,
    //   false
    // ).then(({ hits }) => setPropertiesForSaleData(hits));
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  shuffleArray(allPropertiesData);

  const fullMapWidth = (mobileParam) => {
    const sectionEl = leftSectionRef.current;
    const hidingClasses = ["!w-0", "!h-0", "invisible", "!p-0", "-z-10"];

    sectionHideIconRef.current.classList.toggle("rotate-180");

    setTimeout(() => {
      hidingClasses.forEach((className) =>
        sectionEl.classList.toggle(className)
      );

      if (mobileParam) {
        sectionMapRef.current.classList.toggle("hidden");
        footerRef.current.classList.toggle("hidden");
        mobileMapBtnRef.current.classList.toggle("hidden");
      }
    }, 100);
  };

  useEffect(() => {
    const filterPlacesData = {};

    if (propertyPurpose === "all") {
      filterPlacesData = allPropertiesData;
    } else if (propertyPurpose === "for-rent") {
      filterPlacesData = propertiesRentalData;
    } else if (propertyPurpose === "for-sale") {
      filterPlacesData = propertiesForSaleData;
    }

    setPlacesData(filterPlacesData);
  }, [
    placesData,
    propertyPurpose,
    allPropertiesData,
    propertiesRentalData,
    propertiesForSaleData,
  ]);

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

      {!allPropertiesData[0] ? (
        <div className="min-h-[500px] flex justify-center items-center">
          <h1 className="text-4xl font-bold">Page Loading...</h1>
        </div>
      ) : (
        <main className="flex mb-10">
          <button
            ref={mobileMapBtnRef}
            className="mobile-show-map md:hidden fixed top-[91%] left-1/2 translate-[-50%, -50%] w-24 -ml-12 font-bold text-white bg-gray-800 py-2 rounded-full opacity-80 hover:opacity-100 hover:scale-95 transition-all z-20"
            onClick={() => fullMapWidth(true)}
          >
            Map
            <MapIcon className="h-5 inline ml-1.5" />
          </button>

          <section
            ref={leftSectionRef}
            className="origin-left w-full h-full md:w-3/4 duration-500 overflow-hidden mt-28 sm:px-3 flex flex-col"
            style={{ transitionProperty: "width" }}
          >
            <div className="top-content pl-2">
              <div className="top-info text-sm font-medium mb-2">
                300+ stays - {dateRange} - for {guestCount} guests
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
                  <FilterBtn
                    onFilterClick={() => setPropertyPurpose("for-rent")}
                  >
                    For Rent
                  </FilterBtn>
                )}

                {propertyPurpose !== "for-sale" && (
                  <FilterBtn
                    onFilterClick={() => setPropertyPurpose("for-sale")}
                  >
                    For Sale
                  </FilterBtn>
                )}
              </div>
            </div>

            {placesData?.map((propObj, index) => (
              <PlaceCard key={index} placeName={placeName} {...propObj} />
            ))}
          </section>

          <section
            ref={sectionMapRef}
            className="hidden md:inline-flex relative w-full h-full md:w-1/4 min-w-[400px] xl:min-w-[600px] mt-20 bg-gray-200"
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

              {placesData[0]?.geography.lng && (
                <MapComponent placesData={placesData} />
              )}
            </div>
          </section>
        </main>
      )}

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

export default SearchResultPage;
