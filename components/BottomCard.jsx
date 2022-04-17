import Image from "next/image";

const BottomCard = ({ heading, middleLine, btnText }) => (
  <div className="relative h-80 rounded-xl overflow-hidden">
    <Image
      src="https://links.papareact.com/4cj"
      alt="Get inspired by great places."
      layout="fill"
    />

    <div className="content absolute top-12 left-10">
      <h1 className="text-3xl font-bold w-60">{heading}</h1>
      <p className="font-semibold mt-2 mb-5">Whishlist curated by Airbnb.</p>
      <button className="text-white bg-black text-[15px] font-bold px-4 py-1.5 rounded-lg active:scale-105 transition-transform ease-out">
        Get Inspired
      </button>
    </div>
  </div>
);

export default BottomCard;
