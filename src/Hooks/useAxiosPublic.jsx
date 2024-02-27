import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://file-convator-backend.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
