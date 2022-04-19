import { StarIcon } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";
import Image from "next/image";

const PlaceCard = ({
  img,
  title,
  location,
  description,
  star,
  price,
  total,
}) => (
  <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 py-5 px-2 cursor-pointer hover:shadow-lg transition-shadow ease-out">
    <div className="card-img relative min-w-[300px] min-h-[180px] hover:opacity-90 transition-opacity ease-out">
      <Image
        className="rounded-xl bg-gray-200"
        src={img}
        alt="Hotel room preview image"
        layout="fill"
      />
    </div>
    <div className="card-content relative flex flex-col justify-between w-full min-h-[180px] pl-4 pr-3">
      <div className="top-block">
        <h2 className="heading-3 mb-2">{title}</h2>
        <p className="text-xs font-medium">{location}</p>
        <p className="text-[13px]">{description}</p>
      </div>

      <HeartIcon className="h-6 absolute top-0 right-3" />

      <div className="bottom-block flex items-end justify-between mt-2">
        <div className="rating font-bold flex items-center gap-1">
          <StarIcon className="h-4 text-red-400" /> {star}
        </div>
        <div className="pricing text-right">
          <div className="per-night text-lg md:text-xl font-bold">{price}</div>
          <div className="total text-base md:text-lg font-extralight">
            {total}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PlaceCard;
