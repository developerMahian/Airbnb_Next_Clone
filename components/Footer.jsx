import {
  FaArrowCircleUp,
  FaGithubAlt,
  FaTwitter,
  FaSkype,
} from "react-icons/fa";

const Footer = () => (
  <footer className="h-56 overflow-hidden relative mt-20">
    <div className="flex flex-col items-center justify-end h-full pb-10 before:content-[''] before:absolute before:top-0 before:left-1/2 before:-ml-[75rem] before:w-[150rem] before:h-[150rem] before:rounded-[50%] before:bg-gray-100 before:-z-10">
      <section className="flex gap-6 justify-center items-center mb-10">
        <a
          href="https://twitter.com/DeveloperMahian"
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter className={`${socialIconsClass} text-blue-500`} />
        </a>

        <a
          href="https://join.skype.com/invite/wecW1GItckDh"
          target="_blank"
          rel="noreferrer"
        >
          <FaSkype
            className={`${socialIconsClass} !text-3xl text-sky-500 animate-bounce`}
          />
        </a>

        <a
          href="https://github.com/developerMahian"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithubAlt className={socialIconsClass} />
        </a>
      </section>

      <section className="text-gray-500 text-xs text-center font-mono font-semibold mb-2.5">
        Copyright © 2022, All Right Reserved{" "}
        <a
          href="https://join.skype.com/invite/wecW1GItckDh"
          target="_blank"
          rel="noreferrer"
          className="inline-block text-red-500 hover:text-red-600 hover:scale-105 transition-all duration-300"
        >
          DevMahian
        </a>
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

const socialIconsClass =
  "text-2xl hover:rotate-[20deg] hover:scale-105 transition-transform";

export default Footer;
