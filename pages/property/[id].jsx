import { ShieldCheckIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Header from "../../components/Header/Header";
import ImageCarousel from "../../components/ImageCarousel";
import Footer from "../../components/Footer";
import MapComponent from "../../components/Map";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { fetchApi } from "../../utils/fetchApi";
// import { staticPropertyDetail } from "../../StaticData/propertyDetail";

const Property = ({ propertyDetails }) => {
  const {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  } = propertyDetails;

  return (
    <>
      <Header />

      <main className="container min-h-[calc(100vh-225px)] md:px-4 xl:px-8 mt-20">
        <ImageCarousel photos={photos} />

        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-1 font-extrabold text-base">
            {isVerified && <ShieldCheckIcon className="h-4 text-green-600" />}
            DH {price} {rentFrequency && `/${rentFrequency}`}
          </div>
          <div className="relative w-12 h-12 border-2 border-red-500 overflow-hidden rounded-full">
            <Image
              src={agency?.logo?.url}
              alt={`${agency?.name} logo`}
              title={agency?.name}
              layout="fill"
            />
          </div>
        </div>

        <div className="flex items-center gap-5 text-gray-500 font-semibold mb-12 ml-1">
          <span>
            {rooms} <FaBed className={topIconStyle} title="Bedrooms" />
          </span>
          <VerticalDivider />
          <span>
            {baths} <FaBath className={topIconStyle} title="Bathrooms" />
          </span>
          <VerticalDivider />
          <span>
            {area.toFixed(1)} sqft{" "}
            <BsGridFill className={topIconStyle} title="Property Area" />
          </span>
        </div>

        <section className="mb-16">
          <div className="mb-5">
            <h1 className="text-2xl font-bold mb-3">{title}</h1>
            <p className="leading-7 text-[15px] font-medium text-gray-600 tracking-wider text-justify">
              {description}
            </p>
          </div>

          <div
            className={`flex flex-wrap ${
              furnishingStatus
                ? "lg:flex-nowrap gap-x-16"
                : "sm:flex-nowrap gap-x-24"
            } gap-y-3 justify-between text-base uppercase font-extrabold`}
          >
            <div className="flex justify-between lg:max-w-[400px] w-full">
              <span className="text-gray-400">type:</span>
              <span className="border-b-2 border-gray-300">{type}</span>
            </div>
            <div className="flex justify-between lg:max-w-[400px] w-full">
              <span className="text-gray-400">purpose:</span>
              <span className="border-b-2 border-gray-300">{purpose}</span>
            </div>
            {furnishingStatus && (
              <div className="flex justify-between lg:max-w-[400px] w-full">
                <span className="text-gray-400">furnishing:</span>
                <span className="border-b-2 border-gray-300">
                  {furnishingStatus}
                </span>
              </div>
            )}
          </div>
        </section>

        {amenities[0] && (
          <section className="mb-16">
            <h3 className="text-xl font-extrabold mb-3">Facilities:</h3>

            <div className="flex flex-wrap gap-5">
              {amenities?.map(({ amenities: item }) =>
                item?.map(({ text }, index) => (
                  <div
                    key={index}
                    className="px-5 py-2 rounded-md text-base text-red-500 bg-red-100 font-extrabold hover:scale-105 transition-transform capitalize cursor-default"
                  >
                    {text}
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        <section className="">
          <h3 className="text-xl font-extrabold mb-3">Where you&apos;ll be:</h3>

          <div className="w-full h-80 md:h-96 lg:h-[430px] rounded-xl overflow-hidden">
            <MapComponent placesData={[propertyDetails]} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

const topIconStyle = "inline text-lg text-red-500 ml-1";

const VerticalDivider = () => (
  <span className="bg-black w-[1px] h-6 opacity-20"></span>
);

export default Property;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`/properties/detail?externalID=${id}`);
  // const data = staticPropertyDetail;

  return {
    props: {
      propertyDetails: data,
    },
  };
}
