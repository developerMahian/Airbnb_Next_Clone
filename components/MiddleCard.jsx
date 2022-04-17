import Image from "next/image";
import Link from "next/link";

const MiddleCard = ({ img, title }) => (
  <Link href={"#"}>
    <a className="hover:scale-105 transition-all ease-out">
      <div className="relative w-80 h-80 rounded-lg overflow-hidden mb-1">
        <Image src={img} alt={`${title} - image`} layout="fill" />
      </div>
      <p className="text-center text-base font-bold">{title}</p>
    </a>
  </Link>
);

export default MiddleCard;
