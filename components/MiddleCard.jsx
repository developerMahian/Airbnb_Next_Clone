import Image from "next/image";

const MiddleCard = ({ img, title }) => (
  <div className="keen-slider__slide min-w-[275px]">
    <div className="relative h-72 rounded-lg overflow-hidden mb-1">
      <Image src={img} alt={`${title} - image`} layout="fill" />
    </div>
    <p className="text-center text-lg font-bold">{title}</p>
  </div>
);

export default MiddleCard;
