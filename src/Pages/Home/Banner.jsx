
import { Carousel } from "keep-react";

const Banner = () => {
  return (
    
    <div className="bg-red-200 ">
        <section className="w-1/2">
        </section>
    <div className="grid grid-cols-2 gap-4">
      <Carousel
        showControls={false}
        indicatorsType="ring"
        indicatorsTypeColors="slate"
      >
        <img
          src="https://images.prismic.io/staticmania/dbc3da5c-53e4-409a-bc60-24b5f19014d3_4.png?auto=compress,format"
          alt="slider-1"
        //   height={384}
        //   width={300}
        />
        <img
          src="https://images.prismic.io/staticmania/6096b40b-13f9-4c98-8576-23361422dbc5_2.png?auto=compress,format"
          alt="slider-2"
        //   height={384}
        //   width={300}
        />
        <img
          src="https://images.prismic.io/staticmania/ef443060-de22-498b-94c9-3fd8eaed83fe_3.png?auto=compress,format"
          alt="slider-3"
        //   height={384}
        //   width={300}
        />
      </Carousel>
      <Carousel
        showControls={false}
        indicatorsType="ring"
        indicatorsTypeColors="slate"
      >
        <img
          src="https://images.prismic.io/staticmania/ef443060-de22-498b-94c9-3fd8eaed83fe_3.png?auto=compress,format"
          alt="slider-3"
        //   height={384}
        //   width={300}
        />
        <img
          src="https://images.prismic.io/staticmania/dbc3da5c-53e4-409a-bc60-24b5f19014d3_4.png?auto=compress,format"
          alt="slider-1"
        //   height={384}
        //   width={300}
        />
        <img
          src="https://images.prismic.io/staticmania/6096b40b-13f9-4c98-8576-23361422dbc5_2.png?auto=compress,format"
          alt="slider-2"
        //   height={384}
        //   width={300}
        />
      </Carousel>
    </div>
    </div>
  );
};

export default Banner;