import jsPDF from "jspdf";
import { useState } from "react";
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
        doc.addPage(); // Add a new page for each additional image
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
      <div className="row mt-5">
        <div className="col-lg-3">
          {photos && (
            <div>
              <img
                alt="not fount"
                width="250"
                height="250"
                className="rounded-circle shadow image-fit"
                src="https://img.icons8.com/external-others-justicon/48/000000/external-image-photography-others-justicon-2.png"
              />
              <br />
            </div>
          )}
        </div>
        <div className="col-lg-4">
          {" "}
          <div className="form-group mt-5">
            <input
              type="file"
              name="photo"
              className="form-control"
              onChange={onChangePhotos}
              accept="image/png, image/png, image/jpeg, image/jpg"
              multiple
            />
          </div>
        </div>
        <div className="col-lg">
          {" "}
          <button
            className="btn btn-outline-primary mt-5"
            onClick={pdfGenerate}
            disabled={!photos}
          >
            Download pdf
          </button>
          
        </div>
      </div>
      <div>
        <h2 className="text-center">
          <img
            src="https://img.icons8.com/external-others-justicon/48/000000/external-image-photography-others-justicon-2.png"
            alt="icon"
          />{" "}
          Image to Pdf
        </h2>
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