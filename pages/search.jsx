import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PlaceCard from "../components/PlaceCard";
import { parseISO } from "date-fns";

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return { props: { searchResults } };
}

const SearchPage = ({ searchResults }) => {
  const router = useRouter();
  const { location, startDate, endDate, guestCount } = router.query;

  console.log(searchResults);

  const parsingDate = (date) => {
    const dateObj = parseISO(date);

    let mm = dateObj.toLocaleString("default", { month: "long" });
    let dd = dateObj.getDate();

    dd < 10 ? (dd = "0" + dd) : null;

    return dd + " " + mm + " " + dateObj.getFullYear();
  };
  const dateRange = `${parsingDate(startDate)} - ${parsingDate(endDate)}`;

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
        searchPlaceholder={`${location}  |  ${dateRange}  |  ${guestCount} guests`}
      />

      <main className="min-h-[55vh] mt-28 container mx-auto px-2 flex flex-col">
        <div className="top-info text-xs font-medium mb-1">
          300+ stays - {dateRange} - for {guestCount} guests
        </div>
        <h1 className="heading-1 mb-4">
          Stays in <span className="capitalize">{location}</span>
        </h1>

        <div className="filters space-x-3 mb-4">
          <FilterBtn>Cancelation Flexibility</FilterBtn>
          <FilterBtn>Type of Place</FilterBtn>
          <FilterBtn>Price</FilterBtn>
          <FilterBtn>Rooms and Beds</FilterBtn>
          <FilterBtn>More filters</FilterBtn>
        </div>

        {searchResults?.map((propObj, index) => (
          <PlaceCard key={index} {...propObj} />
        ))}
      </main>

      <Footer />
    </>
  );
};

const FilterBtn = ({ children }) => (
  <button className="inline-block px-3 py-1 border rounded-full font-medium hover:shadow-md active:bg-gray-100 active:scale-95 transition">
    {children}
  </button>
);

export default SearchPage;
