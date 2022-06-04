import Head from "next/head";

import {
  BottomCard,
  Footer,
  Header,
  HomeBanner,
  MiddleCard,
  Slider,
  TopCard,
} from "../components";

import { exploreData, liveAnywhereData } from "../StaticData/indexPageImages";

const HomePage = () => (
  <>
    <Head>
      <title>Airbnb - NextJS Clone</title>
      <meta
        name="description"
        content="Welcome to Airbnb Next.JS Clone Home Page"
      />
    </Head>

    <Header />

    <main className="min-h-[calc(100vh-225px)]">
      <HomeBanner />

      <div className="max-w-4xl mx-auto p-4">
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

          <Slider>
            {liveAnywhereData?.map(({ img, title }, index) => (
              <MiddleCard key={index} img={img} title={title} />
            ))}
          </Slider>
        </section>

        <section className="bottom-card mb-8">
          <BottomCard heading="The Greatest Outdoors" />
        </section>
      </div>
    </main>

    <Footer />
  </>
);

export default HomePage;
