import Image from "next/image";

const TopCard = ({ img, location, distance }) => (
  <div className="flex items-center gap-4 rounded-lg p-1 hover:bg-gray-100 hover:scale-105 transition-all ease-out cursor-pointer">
    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
      <Image
        src={img}
        alt={`${location}s' popular place image`}
        layout="fill"
      />
    </div>
    <div>
      <p className="text-[15px] font-bold">{location}</p>
      <p className="text-xs">{distance}</p>
    </div>
  </div>
);

export default TopCard;
