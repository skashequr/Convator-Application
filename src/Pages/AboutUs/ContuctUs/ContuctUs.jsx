import UserReview from "../../../Component/UserReview/UserReview";

const ContuctUs = () => {
  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7294.336864897116!2d90.39522344142277!3d23.919089071687463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c4efb52c6e19%3A0x62c5fd45a44c2f6!2z4KaP4Kaw4Ka24Ka-4Kam4Kao4KaX4KawLCDgpp_gppngp43gppfgp4A!5e0!3m2!1sbn!2sbd!4v1708358176315!5m2!1sbn!2sbd"
              width="100%"
              height="100%"
              className="absolute inset-0"
              // className="lg:w-2/3 md:w-1/2"
              // style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
              <div className="lg:w-1/2 px-6">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  ADDRESS
                </h2>
                <p className="mt-1">Tongi Gazipur Dhaka Bangladesh</p>
              </div>
              <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                  EMAIL
                </h2>
                <a
                  href="mailto:example@email.com"
                  className="text-indigo-500 leading-relaxed"
                >
                  coddingheroes@email.com
                </a>
                <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                  PHONE
                </h2>
                <p className="leading-relaxed">
                  01927540465 , 01910944242 , 01726606815
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <UserReview></UserReview>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContuctUs;
