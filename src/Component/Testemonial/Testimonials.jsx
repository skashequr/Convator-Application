import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import "./Testimonials.css";
import useAllReviews from "../../Hooks/useAllReviews";
import { useNavigate } from "react-router-dom";

const Testimonials = () => {
  const navigate = useNavigate();
  const [allReviews] = useAllReviews();

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
            {allReviews?.map((review, index) => (
              <SwiperSlide
                onClick={() => {
                  navigate(`/user-review/${review.email}`);
                }}
                className="rounded-3xl card2 bg-white"
                key={index}
              >
                <div className="img flex flex-col justify-center bg-cover bg-center text-sz relative">
                  <div className="z-10 text-body-1 card-inner relative w-full h-full">
                    <div
                      style={{
                        backgroundImage: `url(${review.imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                      className="front rounded-2xl w-full h-full flex flex-col justify-end   text-white absolute"
                    >
                      <div className="relative pb-8 pt-1">
                        <div className="relative z-30 text-white">
                          <h2 className="text-base ml-7 font-bold"></h2>
                          <button className="border border-cyan-50 rounded-full w-fit py-1 px-5 text-base">
                            {review.name}
                          </button>
                        </div>
                        <div className="bg-black w-full h-full absolute bg-opacity-60 bottom-0"></div>
                      </div>
                    </div>
                    <div className="back w-full rounded-2xl h-full absolute bg-titleColor text-white">
                      <div className="text-textColor">
                        <div className="p-6 md:p-8 shadow-md rounded-2xl  space-y-8">
                          <div className="py-4 text-center text-base space-y-1">
                            {/* <h1 className="text-xl md:text-2xl">Md hasan</h1> */}
                            {review.comment.length >= 160 ? (
                              <p>
                                {" "}
                                {review.comment.slice(0, 160) + `......   `}
                                <span className="text-emerald-400">
                                  READ MOre
                                </span>
                              </p>
                            ) : (
                              <p className=" text-sm">{review.comment}</p>
                            )}
                          </div>
                          {/* post , followers following  */}
                          <div className="flex  px-4 justify-between items-center">
                            <div className="text-center">
                              <h5 className="font-medium text-xl">
                                {review.rating}
                              </h5>
                              {/* <p className="text-sm  text-gray-400">Rating</p> */}
                            </div>
                            <div className="text-center">
                              <h5 className="font-medium text-xl">
                                {/* {review.likes} */}
                              </h5>
                              {/* <p className="text-sm  text-gray-400">Like</p> */}
                            </div>
                            <div className="text-center">
                              <h5 className="font-medium text-xl">
                                {/* {review.dislikes} */}
                              </h5>
                              {/* <p className="text-sm  text-gray-400">Dislike</p> */}
                            </div>
                          </div>
                          <div className="flex justify-center"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="slider-controler bottom-10">
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
