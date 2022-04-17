import Head from "next/head";
import Header from "../components/Header";
import TopCard from "../components/TopCard";
import HomeBanner from "../components/HomeBanner";
import MiddleCard from "../components/MiddleCard";
import BottomCard from "../components/BottomCard";
import Footer from "../components/Footer";

export async function getServerSideProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp").then(
    (res) => res.json()
  );
  const liveAnywhereData = await fetch("https://links.papareact.com/zp1").then(
    (res) => res.json()
  );

  return { props: { exploreData, liveAnywhereData } };
}

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
        <h1 className="heading-1 py-2 mb-3">Explore Nearby</h1>

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
        <h1 className="heading-1 py-2 mb-3">Live Anywhere</h1>

        <div className="flex space-x-4 overflow-scroll scrollbar-hide touch-pan-x p-3 -ml-3">
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
