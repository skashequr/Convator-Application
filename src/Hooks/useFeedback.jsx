import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://ourconvert.vercel.app/",
});

const useFeedback = () => {
  return axiosPublic;
};

export default useFeedback;
