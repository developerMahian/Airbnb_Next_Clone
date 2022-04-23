import { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";

const PlaceCard = ({
  img,
  title,
  location,
  description,
  star,
  price,
  total,
}) => {
  const [heartActive, setHeartActive] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 py-5 px-2 cursor-pointer hover:shadow-lg transition-shadow ease-out">
      <div className="card-img relative min-w-[320px] min-h-[200px] hover:opacity-90 transition-opacity ease-out">
        <Image
          className="rounded-xl bg-gray-200"
          src={img}
          alt="Hotel room preview image"
          layout="fill"
        />
      </div>

      <div className="card-content relative flex flex-col gap-4 justify-between w-full lg:min-h-[200px] pr-3">
        <div className="top-block">
          <div className="flex justify-between gap-4">
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <HeartIcon
              className={`${
                heartActive && "fill-red-500"
              } h-6 active:scale-125 transition-transform`}
              onClick={() => setHeartActive(!heartActive)}
            />
          </div>

          <p className="text-xs font-medium">{location}</p>
          <p className="text-[13px]">{description}</p>
        </div>

        <div className="bottom-block flex items-end justify-between mt-2">
          <div className="rating font-bold flex items-center gap-1">
            <StarIcon className="h-4 text-red-400" /> {star}
          </div>
          <div className="pricing text-right">
            <div className="per-night text-lg md:text-xl font-bold">
              {price}
            </div>
            <div className="total text-base md:text-lg font-extralight">
              {total}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
