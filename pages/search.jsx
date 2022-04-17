import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PlaceCard from "../components/PlaceCard";

const SearchPage = () => (
  <>
    <Head>
      <title>Search Places</title>
      <meta
        name="description"
        content="Search and view your favourite Destinations"
      />
    </Head>

    <Header />

    <main className="min-h-[55vh] pt-20 container mx-auto flex flex-col">
      <div className="top-info text-xs font-medium mb-1">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </div>
      <h1 className="heading-1 mb-4">Stays in New York</h1>

      <div className="filters space-x-3">
        <FilterBtn>Cancelation Flexibility</FilterBtn>
        <FilterBtn>Type of Place</FilterBtn>
        <FilterBtn>Price</FilterBtn>
        <FilterBtn>Rooms and Beds</FilterBtn>
        <FilterBtn>More filters</FilterBtn>
      </div>

      <PlaceCard />
    </main>

    <Footer />
  </>
);

const FilterBtn = ({ children }) => (
  <button className="inline-block px-3 py-1 border rounded-full font-medium hover:bg-gray-50 transition-colors">
    {children}
  </button>
);

export default SearchPage;
