import jsPDF from "jspdf";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./ImageToPDF.css";
import Dropzone from "react-dropzone";
import { RingLoader } from "react-spinners";

const Pdfimg = () => {
  const [photos, setPhotos] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [file, setFile] = useState(null);

  const handleUpload = (acceptedFiles) => {
    setLoading(true);

    console.log("logging drop/selected file", acceptedFiles);
    const url = "https://api.escuelajs.co/api/v1/files/upload";
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setPhotos(acceptedFiles);
          // setFile(acceptedFiles[0]);
          setLoading(false);
        } else {
          console.error(response);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const onChangePhotos = (e) => {
  //   const selectedPhotos = Array.from(e.target.files);
  //   setPhotos(selectedPhotos);
  //   setFile(selectedPhotos[0]);
  // };

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
      <h2 className="text-center pt-32 text-5xl text-titleColor font-extrabold">
        Image to Pdf
      </h2>
      <div className="my-10 flex flex-row-reverse justify-center items-center">
        <div className="form-group mt-5"></div>
        <Dropzone
          onDrop={handleUpload}
          accept="image/*"
          minSize={1024}
          maxSize={3072000}
        >
          {({
            getRootProps,
            getInputProps,
            isDragActive,
            isDragAccept,
            isDragReject,
          }) => {
            const additionalClass = isDragAccept
              ? "accept"
              : isDragReject
              ? "reject"
              : "";

            return (
              <div
                {...getRootProps({
                  className: `dropzone ${additionalClass}`,
                })}
              >
                <input {...getInputProps()} />
                <img
                  className="w-64"
                  src="https://cdn.dribbble.com/users/527271/screenshots/6090255/media/c8f4598d29e31001516bc06721fe4f49.gif"
                  alt=""
                />
              </div>
            );
          }}
        </Dropzone>
      </div>
      <div className="flex justify-center items-center w-full text-5xl">
        {loading === true && <RingLoader color="#36d7b7" size={200} />}
      </div>
      {photos !== false && (
        <div className="flex flex-col justify-center">
          <h2 className="text-center text-textColor text-3xl font-semibold">
            Preview of The Created PDF
          </h2>
          <div className="grid grid-cols-6 gap-7 p-6">
            {photos.map((photo, index) => (
              <img
                className="h-60 border w-60 p-3 bg-black rounded-sm border-red-900"
                key={index}
                src={URL.createObjectURL(photo)}
                alt={`Image ${index}`}
              />
            ))}
          </div>
          <button
            className="btn btn-outline-primary mt-5 bg-btnBgColor font-bold p-3 m-2 rounded"
            onClick={pdfGenerate}
            disabled={!photos.length}
          >
            Download pdf
          </button>
        </div>
      )}
    </div>
  );
};

export default Pdfimg;
