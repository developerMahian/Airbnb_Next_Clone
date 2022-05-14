import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Slider = ({ children }) => {
  const [refCallback] = useKeenSlider(
    {
      mode: "free",
      slides: {
        perView: "auto",
        spacing: 15,
      },
    },
    [
      // add plugins here
    ]
  );

  return (
    <div ref={refCallback} className="keen-slider">
      {children}
    </div>
  );
};

export default Slider;
