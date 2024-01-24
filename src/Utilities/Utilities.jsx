// this is using for image upload in imgbb  from any form input feild 
import axios from "axios";
export const ImageUpload = async (image) => {
  const formdata = new FormData();
  formdata.append("image", image);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMABB_API_KEY}`,
    formdata
  );
  console.log(data);
  return data;
};
