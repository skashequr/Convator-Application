import Downloadimg from "./Downloadimg";
import { IoEyeOutline, IoRemove } from "react-icons/io5";
const DisplayImage = ({ imageUrls, handleClickOpen, downloadImage }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {imageUrls.map((url, index) => (
        <div key={index} className="col-span-1 sm:col-span-1">
          <div className="relative h-64">
            <img
              src={url}
              alt={`Page ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 flex space-x-1">
              {/* Assuming IconButton is a component that renders an icon */}
              <IoEyeOutline
                IoEyeOutline
                onClick={() => handleClickOpen(url, index)}
                className="btn-bg"
              >
                <IoRemove />
              </IoEyeOutline>
              <button
                onClick={() => downloadImage(url, index)}
                className="btn-bg"
              >
                <Downloadimg></Downloadimg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayImage;
