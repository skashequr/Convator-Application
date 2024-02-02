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
    "https://i.ibb.co/Jr4TSNS/page-1-start.gif",
    "https://i.ibb.co/xDfKKjk/page-2-image-edit.gif",
    "https://i.ibb.co/HHgM6wd/page-3-start-1.gif",

    "https://i.ibb.co/6gSBLCt/page-3-start-ne.gif",
    "https://i.ibb.co/k6F251z/page-5-start-ne.gif",
    "https://i.ibb.co/dQ5HJ4d/page-6-alledit.gif",

    // "https://i.ibb.co/0M0pFtS/5.png",

    // "https://i.ibb.co/HVTx3vY/7.png",
    // "https://i.ibb.co/gyHRSX4/8.png",
    // "https://i.ibb.co/Z1v61tT/6.png",
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
            {/* <div className="content bg-transparent">
              <button className="bg-[#F1E9D5]">Read More</button>
            </div> */}
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
