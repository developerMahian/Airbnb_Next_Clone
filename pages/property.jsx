import { useEffect, useState } from "react";
import Header from "../components/Header";
import ImageCarousel from "../components/ImageCarousel";
// import { useRouter } from "next/router";
// import { fetchApi } from "../utils/fetchApi";
import { propertyDetail } from "../StaticData/propertyDetail";

const Property = () => {
  const [details, setDetails] = useState({});

  const { title, photos } = details;

  // console.log({ details, photos });

  // const router = useRouter();
  // const { externalID } = router.query;

  useEffect(() => {
    setDetails(propertyDetail);
    // fetchApi(`properties/detail?externalID=${externalID}`, true).then((res) =>
    //   setDetails(res)
    // );
  }, [details]);

  return (
    <>
      <Header />

      <main className="container md:px-4 xl:px-8 mt-20 pt-5">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        <ImageCarousel photos={photos} />
      </main>
    </>
  );
};

export default Property;
