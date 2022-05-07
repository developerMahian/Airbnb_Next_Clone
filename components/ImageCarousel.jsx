import WorkInProgress from "./WorkInProgress";

const ImageCarousel = ({ photos }) => {
  const images = photos?.map(({ url }) => ({
    original: url,
    originalAlt: "shit",
    originalWidth: "200px",
    originalHeight: 200,
  }));

  return images ? (
    <>
      <div className="max-w-2xl mx-auto"></div>

      <WorkInProgress />
    </>
  ) : (
    <h1>hey</h1>
  );
};

export default ImageCarousel;
