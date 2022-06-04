import Image from "next/image";

const TopCard = ({ img, location, distance }) => (
  <div className="flex items-center gap-3 rounded-lg p-1 hover:bg-gray-100 hover:scale-110 transition-all ease-out cursor-pointer">
    <div className="relative w-14 h-14 rounded-lg overflow-hidden">
      <Image
        src={img}
        alt={`${location}s' popular place image`}
        layout="fill"
      />
    </div>
    <div>
      <p className="text-base font-bold">{location}</p>
      <p className="text-sm">{distance}</p>
    </div>
  </div>
);

export default TopCard;
