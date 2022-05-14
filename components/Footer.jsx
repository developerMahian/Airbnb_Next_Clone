import Link from "next/link";
import { FaArrowCircleUp, FaGithubAlt, FaTwitter } from "react-icons/fa";
import Fiverr from "./SvgAssets/Fiverr";

const Footer = () => (
  <footer className="h-56 overflow-hidden relative mt-20">
    <div className="flex flex-col items-center justify-end h-full pb-5 before:content-[''] before:absolute before:top-0 before:left-1/2 before:-ml-[75rem] before:w-[150rem] before:h-[150rem] before:rounded-[50%] before:bg-gray-100 before:-z-10">
      <section className="flex gap-6 justify-center items-center mb-10">
        <a href="#" target="_blank">
          <FaTwitter className={`${socialIconsClass} text-blue-500`} />
        </a>

        <a
          href="#"
          target="_blank"
          className="hover:rotate-[20deg] transition-transform"
        >
          <Fiverr />
        </a>

        <a href="#" target="_blank">
          <FaGithubAlt className={socialIconsClass} />
        </a>
      </section>

      <section className="text-gray-500 text-xs text-center font-mono font-semibold mb-2.5">
        Copyright © 2022, All Right Reserved{" "}
        <Link href="#">
          <a className="inline-block text-red-500 hover:text-red-600 hover:scale-105 transition-all duration-300">
            DevMahian
          </a>
        </Link>
        <div>Inspired by Airbnb</div>
      </section>

      <button
        onClick={() => window.scroll({ top: 0, left: 0, behavior: "smooth" })}
      >
        <FaArrowCircleUp className="text-[40px] text-red-500 hover:text-red-600 hover:scale-110 transition-all duration-300" />
      </button>
    </div>
  </footer>
);

const socialIconsClass = "text-2xl hover:rotate-[20deg] transition-transform";

export default Footer;
