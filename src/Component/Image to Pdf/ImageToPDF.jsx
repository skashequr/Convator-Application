import jsPDF from "jspdf";
import { useState } from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { Helmet } from "react-helmet-async";
const Pdfimg = () => {
  const [photos, setPhotos] = useState([]);

  const onChangePhotos = (e) => {
    const selectedPhotos = Array.from(e.target.files);
    setPhotos(selectedPhotos);
  };

  console.log(photos);

  const pdfGenerate = () => {
    var doc = new jsPDF("p", "pt", "a4");

    photos.forEach((photo, index) => {
      if (index !== 0) {
        doc.addPage();
      }

      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();
      var img = URL.createObjectURL(photo);
      doc.addImage(img, null, 0, 0, width, height, null, "FAST");
    });

    doc.save("images.pdf");
  };

  return (
    <div className="container mt-5">
      <Helmet>
        <title>Image-pdf</title>
      </Helmet>
      <h2 className="text-center">Image to Pdf</h2>
      <div className="row mt-5">
        <div className="col-lg-3">
          {photos && (
            <div>
              <br />
            </div>
          )}
        </div>
        <div>
          <div className="flex justify-center items-center">
            <div className="">
              {" "}
              <div className="form-group mt-5">
                <input
                  type="file"
                  name="photo"
                  id="img"
                  className="form-control"
                  multiple
                  hidden
                />

                <div className="flex justify-center items-center">
                  <div>
                    <input
                      className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="img"
                      type="file"
                      onChange={onChangePhotos}
                      accept="image/png, image/png, image/jpeg, image/jpg"
                    ></input>
                  </div>
                  <div>
                    <div className="col-lg">
                      {" "}
                      <button
                        className="btn btn-outline-primary mt-5 bg-orange-500 p-3 m-2 rounded"
                        onClick={pdfGenerate}
                        disabled={!photos}
                      >
                        Download pdf
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:block w-96 w-96 bg-indigo-500 py-10 px-10">
              <img
                src="https://cdn.dribbble.com/users/527271/screenshots/6090255/media/c8f4598d29e31001516bc06721fe4f49.gif"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-center ">Output</h2>
        <div className="grid grid-cols-6 gap-7 p-6">
          {photos.map((photo) => (
            <img
              className="h-60 border w-60 p-3 bg-black rounded-sm border-red-900"
              key={photo.id}
              src={URL.createObjectURL(photo)}
              alt={photo.altText}
            />
          ))}
        </div>
      </div>

      <footer>
        <p className="text-center"></p>
      </footer>
    </div>
  );
};

export default Pdfimg;
