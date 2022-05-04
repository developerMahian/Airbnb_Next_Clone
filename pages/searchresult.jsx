import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { parseISO } from "date-fns";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import PlaceCard from "../components/PlaceCard";
import MapComponent from "../components/Map";
import { ArrowCircleLeftIcon } from "@heroicons/react/solid";
import { fetchApi } from "../utils/fetchApi";
import { rentalList, forSaleList } from "../StaticData/propertyList";

const SearchResultPage = () => {
  const [propertiesRentalData, setPropertiesRentalData] = useState(rentalList);
  const [propertiesForSaleData, setPropertiesForSaleData] =
    useState(forSaleList);
  const [propertyPurpose, setPropertyPurpose] = useState("all");

  const leftSectionRef = useRef(null);
  const sectionHideIconRef = useRef(null);

  const router = useRouter();
  const { placeName, locationExternalIDs, startDate, endDate, guestCount } =
    router.query;

  useEffect(() => {
    console.log("API useEffect ran....");
    // fetchApi(
    //   `properties/list?locationExternalIDs=${locationExternalIDs}&purpose=for-rent`,
    //   false
    // ).then(({ hits }) => setPropertiesRentalData(hits));
    // fetchApi(
    //   `properties/list?locationExternalIDs=${locationExternalIDs}&purpose=for-sale`,
    //   false
    // ).then(({ hits }) => setPropertiesForSaleData(hits));
  }, []);

  let allPropertiesData = [...propertiesForSaleData, ...propertiesRentalData];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  shuffleArray(allPropertiesData);

  const fullMapWidth = () => {
    const sectionEl = leftSectionRef.current;
    const hidingClasses = ["!w-0", "invisible", "!p-0", "-z-10"];

    sectionHideIconRef.current.classList.toggle("rotate-180");

    setTimeout(() => {
      hidingClasses.forEach((className) =>
        sectionEl.classList.toggle(className)
      );
    }, 100);
  };

  const filterPlacesData = () => {
    if (propertyPurpose === "all") {
      return allPropertiesData;
    } else if (propertyPurpose === "for-rent") {
      return propertiesRentalData;
    } else if (propertyPurpose === "for-sale") {
      return propertiesForSaleData;
    }
  };

  const placesData = filterPlacesData();

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
          <section
            ref={leftSectionRef}
            className="origin-left w-full md:w-3/4 duration-500 overflow-hidden mt-28 px-3 flex flex-col"
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

          <section className="hidden md:inline-flex relative w-full md:w-1/4 min-w-[400px] xl:min-w-[600px] h-full mt-20 bg-gray-200">
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

      <div className="block md:hidden">
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
