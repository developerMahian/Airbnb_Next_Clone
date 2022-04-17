import Image from "next/image";
import Link from "next/link";

const TopCard = ({ img, location, distance }) => (
  <Link href={"#"}>
    <a>
      <div className="flex items-center gap-4 rounded-lg p-1 hover:bg-gray-100 hover:scale-105 transition-all ease-out">
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
    </a>
  </Link>
);

export default TopCard;
