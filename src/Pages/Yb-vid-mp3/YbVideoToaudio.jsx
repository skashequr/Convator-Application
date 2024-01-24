import { useRef, useState } from "react";
// import { Button } from "keep-react";
// import { SignIn } from "phosphor-react";
import axios from "axios";
import { getYouTubeVideoId } from "../../utils";
const YbVideoToaudio = () => {
  const inputUrlRef = useRef();

  const [urlResult, setUrlResult] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputUrlRef.current.value);
    const youtubeID = getYouTubeVideoId(inputUrlRef.current.value);
    console.log(youtubeID);
    const options = {
      method: "GET",
      url: "https://youtube-mp3-download1.p.rapidapi.com/dl",

      headers: {
        "X-RapidAPI-Key": "49368db0f9msh2ec7188a8d22727p11f1e1jsn39c88666711a",
        "X-RapidAPI-Host": "youtube-mp3-download1.p.rapidapi.com",
      },
      params: {
        id: youtubeID,
      },
    };
    axios(options)
      .then((res) => setUrlResult(res.data.link))
      .catch((error) => console.log(error));
    inputUrlRef.current.value = "";
  };
  return (
    <div className="mt-6">
      <div className="min-h-[600px] sm:px-2 px-3 mx-3 max-h-[800px] py-20 rounded-t-2xl bg-[#2A3342]">
        <div className="flex justify-center flex-col">
          {/* Beautiful announcement line */}
          <div className="bg-[#1F2937] mx-auto max-w-[250px] pr-3 pl-1 py-[6px]  rounded-full gap-2 flex  items-center text-white">
            <span className="bg-[#1B4DFF] sm:px-3 px-2 sm:py-1 py-[3px] sm:text-base text-sm rounded-full">
              YB
            </span>
            Youtube to Mp3 Conveter
          </div>
          {/* -------- Banner Content ----------------*/}
          <div className="mt-10 ">
            <h2 className="text-white lg:text-5xl md:text-4xl sm:text-3xl text-2xl max-w-[600px] mx-auto text-center font-extrabold ">
              A small business is only as good as its tools.
            </h2>
            <p className="lg:text-xl md:text-lg text-[#8896AB] mt-5 max-w-[600px] text-center mx-auto text-sm">
              We’re different. Flex is the only saas business platform that lets
              you run your business on one platform, seamlessly across all
              digital channels.
            </p>
            {/*----------- Banner action-----------  */}
            <form onSubmit={handleSubmit}>
              <div className="mt-5 flex md:flex-row max-w-[450px] mx-auto justify-center gap-2 flex-col">
                <div className="md:ml-auto md:mr-0 lg:w-[55%] relative">
                  <svg
                    className="absolute mt-[10px] ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 3.38 8.06 7.75 8.94.57.11.78-.25.78-.55v-3.06c0-.31-.22-.59-.53-.64C5.61 16.31 4 14.29 4 12c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6c-.34 0-.67-.04-1-.09-.31-.05-.54-.33-.54-.64v-3.07c0-.3-.21-.66.57-.59 3.43.65 6.18 3.25 6.18 6.49v.5c0 .41.34.75.75.75s.75-.34.75-.75v-.5c0-4.57-3.61-8.25-8-8.75z" />
                  </svg>
                  <input
                    ref={inputUrlRef}
                    placeholder="Paste youtube Video link"
                    className="pr-3 pl-8 rounded-lg w-full  py-3"
                    type="text"
                    name=""
                    id=""
                  ></input>
                </div>
                <div className=" md:mr-auto md:ml-0 lg:w-[45%] ">
                  {/* <Button type="primary" size="md">
                    Search Now
                    <span className="pl-2">
                      <SignIn size={24} />
                    </span>
                  </Button> */}
                  <button
                    type="submit"
                    className="flex items-center relative w-36 border-2
                   border-sky-500 text-sky-500 p-4 
                   rounded-lg group"
                  >
                    <span>Get search</span>
                    <span
                      className="absolute w-1/6 right-3 group-hover:w-5/6 box-content duration-300
                    flex justify-center bg-white rounded-lg"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-10"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M4 12H20M20 12L14 6M20 12L14 18"
                            stroke="#0ea5e9"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </form>
            {/* ----------------------- */}
          </div>
        </div>
        {/* download */}
        <div className="text-center mt-8">
          {urlResult ? (
            <a target="_blank" rel="noreferrr noreferrer" href={urlResult}>
              <button className="text-xl box-border border-4 border-sky-900 w-48 h-16 bg-sky-600 text-white relative group">
                <span className="pr-8">Download Mp3</span>
                <span className="bg-sky-900 absolute right-0 top-0  h-full flex items-center justify-center px-1 group-hover:duration-300 group-hover:w-full w-10 duration-300">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-8 inline mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                  </svg>
                </span>
              </button>
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default YbVideoToaudio;
