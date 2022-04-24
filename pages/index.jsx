import Head from "next/head";
import Header from "../components/Header";
import TopCard from "../components/TopCard";
import HomeBanner from "../components/HomeBanner";
import MiddleCard from "../components/MiddleCard";
import BottomCard from "../components/BottomCard";
import Footer from "../components/Footer";
import { tns } from "tiny-slider";

export async function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp").then(
    (res) => res.json()
  );
  const liveAnywhereData = await fetch("https://links.papareact.com/zp1").then(
    (res) => res.json()
  );

  return { props: { exploreData, liveAnywhereData } };
}

const slider = tns({
  container: ".my-slider",
  items: 3,
  slideBy: "page",
  autoplay: true,
});

const HomePage = ({ exploreData, liveAnywhereData }) => (
  <>
    <Head>
      <title>Airbnb - NextJS Clone</title>
      <meta
        name="description"
        content="Welcome to Airbnb Next.JS Clone Home Page"
      />
    </Head>

    <Header />
    <HomeBanner />

    <main className="max-w-4xl mx-auto p-4">
      <section className="top-cards mb-8">
        <h1 className="text-3xl font-extrabold py-2 mb-3">Explore Nearby</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {exploreData?.map(({ img, location, distance }) => (
            <TopCard
              key={img}
              img={img}
              location={location}
              distance={distance}
            />
          ))}
        </div>
      </section>

      <section className="middle-slider mb-16">
        <h1 className="text-3xl font-extrabold py-2 mb-3">Live Anywhere</h1>

        {/* <div className="my-slider flex space-x-4 overflow-scroll scrollbar-hide touch-pan-x p-3 -ml-3"> */}
        <div className="my-slider">
          {liveAnywhereData?.map(({ img, title }) => (
            <MiddleCard key={img} img={img} title={title} />
          ))}
        </div>
      </section>

      <section className="bottom-card mb-8">
        <BottomCard heading="The Greatest Outdoors" />
      </section>
    </main>

    <Footer />
  </>
);

export default HomePage;
