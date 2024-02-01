import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import "./Testimonials.css";

const Testimonials = () => {
  const slideReviews = [
    {
      id: 1,
      client_name: "John Doe",
      rating: 4.5,
      review_date: "2024-01-20",
      comment: "Great service! The product exceeded my expectations.",
      likes: 15,
      dislikes: 2,
      profile_picture:
        "https://t4.ftcdn.net/jpg/06/13/35/31/240_F_613353190_sozuPsAzQLmggUJfwiBRt0bTCqUnB1aL.jpg",
    },
    {
      id: 2,
      client_name: "Jane Smith",
      rating: 3.8,
      review_date: "2024-01-22",
      comment:
        "The product was good, but the delivery took longer than expected.",
      likes: 8,
      dislikes: 1,
      profile_picture:
        "https://t4.ftcdn.net/jpg/00/95/11/47/240_F_95114739_nlxM48WSlHeLeR6ORivepbVTzyjgyxPb.jpg",
    },
    {
      id: 3,
      client_name: "Michael Johnson",
      rating: 5.0,
      review_date: "2024-01-24",
      comment:
        "Amazing experience! Quick delivery and excellent customer support.",
      likes: 20,
      dislikes: 0,
      profile_picture:
        "https://t3.ftcdn.net/jpg/06/13/02/92/240_F_613029262_nIrEZdHDTjlHjvbtetcZ7o5ZP0Nqv6sQ.jpg",
    },
    {
      id: 3,
      client_name: "Michael Johnson",
      rating: 5.0,
      review_date: "2024-01-24",
      comment:
        "Amazing experience! Quick delivery and excellent customer support.",
      likes: 20,
      dislikes: 0,
      profile_picture:
        "https://t3.ftcdn.net/jpg/06/84/13/88/240_F_684138844_6eNwg8IdZWmGYkyIKmsE8Lj0QcfU1TlP.jpg",
    },
    {
      id: 3,
      client_name: "Michael Johnson",
      rating: 5.0,
      review_date: "2024-01-24",
      comment:
        "Amazing experience! Quick delivery and excellent customer support.",
      likes: 20,
      dislikes: 0,
      profile_picture:
        "https://t4.ftcdn.net/jpg/06/88/20/13/240_F_688201384_vqVs1exkFaSin09EPHPrdG1FLJ1jgiZP.jpg",
    },
    {
      id: 3,
      client_name: "Michael Johnson",
      rating: 5.0,
      review_date: "2024-01-24",
      comment:
        "Amazing experience! Quick delivery and excellent customer support.",
      likes: 20,
      dislikes: 0,
      profile_picture:
        "https://t3.ftcdn.net/jpg/06/26/03/12/240_F_626031210_ZdDbsnsqTTjV9qRueIxtwlViuKbeFaEG.jpg",
    },
    {
      id: 3,
      client_name: "Michael Johnson",
      rating: 5.0,
      review_date: "2024-01-24",
      comment:
        "Amazing experience! Quick delivery and excellent customer support.",
      likes: 20,
      dislikes: 0,
      profile_picture:
        "https://t3.ftcdn.net/jpg/03/01/86/24/240_F_301862438_rXxpfbeJNBftrUtwFqPojMLkvBD4YODF.jpg",
    },
  ];

  return (
    <section className=" ">
      <div className="container px-6 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-titleColor capitalize lg:text-3xl ">
          What our <span className="text-spanTextColor">clients</span> say
        </h1>

        <p className="max-w-2xl mx-auto mt-6 text-center text-textColor">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt
          ex placeat modi magni quia error alias, adipisci rem similique, at
          omnis eligendi optio eos harum.
        </p>

        <div className="container ">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={{ el: ".swiper-pagination", clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="swiper_container"
          >
            {slideReviews.map((review, index) => (
              <SwiperSlide className="rounded-3xl" key={index}>
                <div
                  className={`text-yellow-200 img flex flex-col justify-center bg-cover bg-center  text-sz`}
                  style={{
                    backgroundImage: `url(${review.profile_picture})`,
                  }}
                >
                  <div className="z-10 text-body-1">
                    <h2>{review.client_name}</h2>
                    <p>{review.comment}</p>
                    <p>Rating: {review.rating}</p>
                    <p>Likes: {review.likes}</p>
                    <p>Dislikes: {review.dislikes}</p>
                  </div>
                  <div className="bg-black w-full h-full absolute opacity-40"></div>
                </div>
              </SwiperSlide>
            ))}

            <div className="slider-controler">
              <div className="swiper-button-prev slider-arrow">
                <ion-icon name="arrow-back-outline"></ion-icon>
              </div>
              <div className="swiper-button-next slider-arrow">
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
