import { ArrowCircleUpIcon } from "@heroicons/react/solid";
import Link from "next/link";

const Footer = () => (
  <footer className="h-80 overflow-hidden relative mt-8">
    <div className="flex flex-col items-center justify-end h-full pb-6 before:content-[''] before:absolute before:top-0 before:left-1/2 before:-ml-[75rem] before:w-[150rem] before:h-[150rem] before:rounded-[50%] before:bg-gray-100 before:-z-10">
      <div className="text-gray-500 font-mono font-semibold mb-3">
        Copyright © 2022, All Right Reserved{" "}
        <Link href="#">
          <a className="inline-block text-red-500 hover:text-red-600 hover:scale-105 transition-all duration-300">
            DevMahian
          </a>
        </Link>
      </div>
      <button>
        <ArrowCircleUpIcon className="h-16 text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-300" />
      </button>
    </div>
  </footer>
);

export default Footer;
