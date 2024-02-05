import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import pdfjsLib from "pdfjs-dist";

const Converterimg = (props) => {
  const [loading, setLoading] = useState(false);
  const [numOfPages, setNumOfPages] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderPage = async (data) => {
    setLoading(true);
    const imagesList = [];
    const canvas = document.createElement("canvas");
    canvas.setAttribute("class", "canv");
    const pdf = await pdfjsLib?.getDocument({ data }).promise;

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const renderContext = {
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      };

      await page.render(renderContext).promise;
      let img = canvas.toDataURL("image/png");
      imagesList.push(img);
    }

    setNumOfPages((prevNum) => prevNum + pdf.numPages);
    setImageUrls((prevUrls) => [...prevUrls, ...imagesList]);
    setLoading(false);
  };

  const UrlUploader = useCallback(
    (url) => {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          let reader = new FileReader();
          reader.onload = (e) => {
            const data = atob(e.target.result.replace(/.*base64,/, ""));
            renderPage(data);
          };
          reader.readAsDataURL(blob);
        });
    },
    [renderPage]
  );

  useEffect(() => {
    UrlUploader(props.pdfUrl);
  }, [props.pdfUrl, UrlUploader]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && <p>Number of Pages: {numOfPages}</p>}
      {!loading &&
        imageUrls.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Page ${index + 1}`} />
        ))}
    </div>
  );
};

Converterimg.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
};

export default Converterimg;
