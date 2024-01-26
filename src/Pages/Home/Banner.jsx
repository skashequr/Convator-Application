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
    "https://i.ibb.co/Ry15pgx/1.png",
    "https://i.ibb.co/zr5qzhb/2.png",
    "https://t4.ftcdn.net/jpg/02/06/64/81/240_F_206648117_2bHSehuQ9gDCq60BuM9ujl5kvXEMsNll.jpg",
    "https://t3.ftcdn.net/jpg/04/30/39/68/240_F_430396841_qE2QHqxR4s0LYSDFaYw8NvPSFLG4gbbN.jpg",
    "https://t3.ftcdn.net/jpg/04/55/67/38/240_F_455673821_cVqMvtRHEdc2OTyzgxMkwwv0mQ2s6TAq.jpg",
    "https://t4.ftcdn.net/jpg/02/89/23/05/240_F_289230573_Zrx0qddb7Ll8h0sCuopUqSSYN9kbbhx0.jpg",
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
            <div className="content text-black">
              <h2 className="title text-black">"The Migration"</h2>
              <p className="description text-black">
                {" "}
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Tempore fuga voluptatum, iure corporis inventore praesentium
                nisi. Id laboriosam ipsam enim.{" "}
              </p>
              <button className="bg-[#F1E9D5] text-black">Read More</button>
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