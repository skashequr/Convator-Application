// import { Carousel } from "keep-react";
import { useEffect, useState } from "react";
import "./Banner.css";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slider = document.querySelector(".slider");

    function activate(e) {
      const items = document.querySelectorAll(".item");
      e.target.matches(".next") && slider.append(items[0]);
      e.target.matches(".prev") && slider.prepend(items[items.length - 1]);
    }

    document.addEventListener("click", activate, false);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("click", activate, false);
    };
  }, []);

  const items = [
    "https://cdn.mos.cms.futurecdn.net/dP3N4qnEZ4tCTCLq59iysd.jpg",
    "https://i.redd.it/tc0aqpv92pn21.jpg",
    "https://wharferj.files.wordpress.com/2015/11/bio_north.jpg",
    "https://images7.alphacoders.com/878/878663.jpg",
    "https://theawesomer.com/photos/2017/07/simon_stalenhag_the_electric_state_6.jpg",
    "https://da.se/app/uploads/2015/09/simon-december1994.jpg",
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  return (
    <div className="banner-div">
      <ul className="slider">
        {items.map((item, index) => (
          <li
            key={index}
            className={` ${index === currentIndex ? "active" : ""} item`}
            style={{ backgroundImage: `url('${item}')` }}
          >
            <div className="content">
              <h2 className="title">"The Migration"</h2>
              <p className="description">
                {" "}
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Tempore fuga voluptatum, iure corporis inventore praesentium
                nisi. Id laboriosam ipsam enim.{" "}
              </p>
              <button>Read More</button>
            </div>
          </li>
        ))}
      </ul>
      <nav className="nav">
        <button
          className="btn prev"
          // name="arrow-back-outline"
          onClick={prevSlide}
        >
          {/* Corrected: Added ion-icon class */}
          <ion-icon name="arrow-back-outline"></ion-icon>
        </button>
        <button
          className="btn next"
          // name="arrow-forward-outline"
          onClick={nextSlide}
        >
          {/* Corrected: Added ion-icon class */}
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
      </nav>
    </div>
  );
};

export default Banner;
