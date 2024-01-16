import { useState, useEffect } from "react";
import pdfjsLib from "pdfjs-dist";

const PdfViewer = (props) => {
  const [loading, setLoading] = useState(false);
  const [numOfPages, setNumOfPages] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);

  const UrlUploader = (url) => {
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
  };

  const renderPage = async (data) => {
    setLoading(true);
    const imagesList = [];
    const canvas = document.createElement("canvas");
    canvas.setAttribute("className", "canv");
    const pdf = await pdfjsLib.getDocument({ data }).promise;

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

  // useEffect to call UrlUploader when the component mounts
  useEffect(() => {
    UrlUploader(props.pdfUrl);
  }, [props.pdfUrl]);

  return (
    <div>
      {/* Your rendering logic goes here */}
      {loading && <p>Loading...</p>}
      {!loading && <p>Number of Pages: {numOfPages}</p>}
      {!loading &&
        imageUrls.map((imageUrl, index) => (
          <img key={index} src={imageUrl} alt={`Page ${index + 1}`} />
        ))}
    </div>
  );
};

export default PdfViewer;
