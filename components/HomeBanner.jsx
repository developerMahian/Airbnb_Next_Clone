import Image from "next/image";

const HomeBanner = () => (
  <div className="home-banner relative mt-20 h-[270px] sm:h-[350px] lg:h-[450px] 2xl:h-[550px]">
    <Image
      className="-z-10"
      src="/assets/images/banner.jpg"
      alt="Homepage banner image"
      layout="fill"
      objectPosition="bottom"
      priority={true}
    />

    <div className="banner-content text-base absolute top-[36%] w-full text-center">
      <p className="inline-block text-lg font-bold tracking-wide backdrop-blur text-white bg-[#0000008c] shadow mb-6 py-2 px-8 rounded-full">
        Not sure where to go? Perfect.
      </p>
      <br />
      <button className="inline-block text-base font-bold focus:outline shadow hover:shadow-xl active:scale-105 transition-all ease-out px-5 py-1.5 rounded-full bg-white text-purple-800">
        I&lsquo;m Flexible
      </button>
    </div>
  </div>
);

export default HomeBanner;
