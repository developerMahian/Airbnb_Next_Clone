import ImageGallery from "react-image-gallery";

const ImageCarousel = ({ photos }) => {
  const images = photos?.map(({ url }) => ({
    original: url,
    thumbnail: url,
  }));

  return (
    <div className="max-w-4x mx-auto">
      {images && <ImageGallery items={images} showBullets showIndex lazyLoad />}
    </div>
  );
};

export default ImageCarousel;
