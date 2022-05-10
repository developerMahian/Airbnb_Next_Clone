import { ShieldCheckIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Header from "../../components/Header";
import ImageCarousel from "../../components/ImageCarousel";
import WorkInProgress from "../../components/WorkInProgress";
// import { fetchApi } from "../utils/fetchApi";
import { staticPropertyDetail } from "../../StaticData/propertyDetail";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import Footer from "../../components/Footer";

const Property = ({
  propertyDetails: {
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
  },
}) => (
  <>
    <Header />

    <main className="container md:px-4 xl:px-8 mt-20">
      <ImageCarousel photos={photos} />

      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-1 font-extrabold text-base">
          {!isVerified && <ShieldCheckIcon className="h-4 text-green-600" />}
          AED {price} {rentFrequency && `/${rentFrequency}`}
        </div>
        <div className="relative w-12 h-12 border-2 border-red-500 overflow-hidden rounded-full box-content">
          <Image
            src={agency?.logo?.url}
            alt={`${agency?.name} logo`}
            layout="fill"
          />
        </div>
      </div>

      <div className="flex items-center gap-5 text-gray-500 font-semibold mb-10 ml-1">
        <span>
          {rooms} <FaBed className={topIconStyle} />
        </span>
        <VerticalDivider />
        <span>
          {baths} <FaBath className={topIconStyle} />
        </span>
        <VerticalDivider />
        <span>
          {area.toFixed(1)} sqft <BsGridFill className={topIconStyle} />
        </span>
      </div>

      <div className="mb-3">
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
        } gap-y-3 justify-between text-base uppercase font-extrabold mb-10`}
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

      {amenities[0] && (
        <div>
          <h3 className="text-xl font-extrabold">Facilities:</h3>
        </div>
      )}
    </main>

    <WorkInProgress />

    <Footer />
  </>
);

const topIconStyle = "inline text-lg text-red-500 ml-1";

const VerticalDivider = () => (
  <span className="bg-black w-[1px] h-6 opacity-20"></span>
);

export default Property;

export async function getServerSideProps({ params: { id } }) {
  // const data = await fetchApi(`properties/detail?externalID=${id}`, true);
  const data = staticPropertyDetail;

  return {
    props: {
      propertyDetails: data,
    },
  };
}
