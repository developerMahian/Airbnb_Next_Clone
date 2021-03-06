import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { HeartIcon } from "@heroicons/react/outline";

const PlaceCard = ({
  externalID,
  coverPhoto: { url: img },
  title,
  price,
  rooms,
  baths,
  purpose,
  rentFrequency,
}) => {
  const [heartActive, setHeartActive] = useState(false);

  const router = useRouter();

  const formattedPrice = () => {
    return new Intl.NumberFormat("en-GB", {
      notation: "compact",
      compactDisplay: "long",
    }).format(price);
  };

  return (
    <div
      className="flex flex-col relative gap-4 py-5 px-2 mb-3 cursor-pointer hover:shadow-lg transition-shadow ease-out"
      onClick={() => router.push(`/property/${externalID}`)}
    >
      <div className="card-img relative min-h-[300px] hover:opacity-90 transition-opacity ease-out">
        <Image
          className="rounded-xl bg-gray-200"
          src={img}
          alt="Hotel room preview image"
          layout="fill"
        />
      </div>

      <div className="card-content relative flex flex-col gap-4 w-full">
        <div className="flex justify-between items-start gap-4">
          <h2 className="w-4/5 text-lg font-semibold mb-2">{title}</h2>
          <HeartIcon
            className={`${
              heartActive && "fill-red-500"
            } h-7 active:scale-125 transition-transform`}
            onClick={() => setHeartActive((prev) => !prev)}
          />
        </div>

        <div className="flex justify-between items-center gap-6 flex-wrap">
          <p className="flex items-center gap-3 text-base font-medium text-gray-600">
            <strong>{purpose.toUpperCase()}</strong>
            {rooms ? (
              <>
                <span className="text-[6px]">🟢</span> {rooms} Room
              </>
            ) : null}
            <span className="text-[6px]">🟢</span> {baths} Bathroom
          </p>

          <div>
            <span className="text-lg md:text-xl font-bold mr-1">
              <span className="tracking-tighter">DH</span> {formattedPrice()}
            </span>
            <span className="text- md:text-lg font-medium">
              {rentFrequency && "month"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
