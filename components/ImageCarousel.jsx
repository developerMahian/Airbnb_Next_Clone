import ImageGallery from "react-image-gallery";
import WorkInProgress from "./WorkInProgress";

const ImageCarousel = ({ photos }) => {
  const images = photos?.map(({ url }) => ({
    original: url,
    thumbnail: url,
    thumbnailHeight: 10,
  }));

  return (
    <>
      <div className="max-w-4x mx-auto">
        {images && (
          <ImageGallery items={images} showBullets showIndex lazyLoad />
        )}
      </div>

      <WorkInProgress />
    </>
  );
};

export default ImageCarousel;
