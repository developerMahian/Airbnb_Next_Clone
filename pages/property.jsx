import { useRouter } from "next/router";

const Property = () => {
  const router = useRouter();

  const { externalID } = router.query;
  // `properties/detail?externalID=${externalID}`

  return <div className="text-5xl text-center mt-20">{externalID}</div>;
};

export default Property;
