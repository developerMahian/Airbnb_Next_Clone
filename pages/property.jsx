import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchApi } from "../utils/fetchApi";
import { propertyDetail } from "../StaticData/propertyDetail";

const Property = () => {
  const [details, setDetails] = useState({});

  const router = useRouter();
  const { externalID } = router.query;

  useEffect(() => {
    setDetails(propertyDetail);
    // fetchApi(`properties/detail?externalID=${externalID}`, true).then((res) =>
    //   setDetails(res)
    // );
  }, [details]);

  return (
    <button className="text-5xl mx-auto block mt-20">
      Details Pages coming soon....
    </button>
  );
};

export default Property;
