import Image from "next/image";

const MiddleCard = ({ img, title }) => (
  <div className="hover:scale-105 transition-all ease-out cursor-pointer">
    <div className="relative w-80 h-80 rounded-lg overflow-hidden mb-1">
      <Image src={img} alt={`${title} - image`} layout="fill" />
    </div>
    <p className="text-center text-base font-bold">{title}</p>
  </div>
);

export default MiddleCard;
