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
        "https://t4.ftcdn.net/jpg/06/32/75/57/240_F_632755741_SJ2jnBOzuSje5gnvFIjD3HRl3rwQhAr9.jpg",
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
        "https://t4.ftcdn.net/jpg/07/18/04/99/240_F_718049910_Om4Qj3ixFrCa6jBeUUBWbSdkhe13aThM.jpg",
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
        "https://t3.ftcdn.net/jpg/06/72/66/64/240_F_672666463_H5ThiNHfPRnsX1Yj5c5qp7RCMKDXGnN2.jpg",
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
        "https://t4.ftcdn.net/jpg/06/63/31/27/240_F_663312737_C8NX3yxfMPfHMCDNIXuAi0vQ7y19zItw.jpg",
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
      <div className="my-20 px-6 mx-auto">
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
              <SwiperSlide className="rounded-3xl card2 bg-white" key={index}>
                <div className="img flex flex-col justify-center bg-cover bg-center text-sz relative">
                  <div className="z-10 text-body-1 card-inner relative w-full h-full">
                    <div
                      style={{
                        backgroundImage: `url(${review.profile_picture})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                      className="front rounded-2xl w-full h-full flex flex-col justify-end   text-white absolute"
                    >
                      <div className="relative pb-8 pt-1">
                        <div className="relative z-30 text-white">
                          <h2 className="text-base font-bold">
                            This is Tanvir
                          </h2>
                          <p className="text-base">Web Developer</p>
                          <button className="border border-cyan-50 rounded-full w-fit py-1 px-5 text-base">
                            Hover Me
                          </button>
                        </div>
                        <div className="bg-black w-full h-full absolute bg-opacity-60 bottom-0"></div>
                      </div>
                    </div>
                    <div className="back w-full rounded-2xl h-full absolute bg-white">
                      <h2>{review.client_name}</h2>
                      <p>{review.comment}</p>
                      <p>Rating: {review.rating}</p>
                      <p>Likes: {review.likes}</p>
                      <p>Dislikes: {review.dislikes}</p>
                    </div>
                  </div>
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
