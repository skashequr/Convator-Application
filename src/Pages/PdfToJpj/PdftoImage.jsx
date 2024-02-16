import { useState, useEffect } from "react";
const PDFJS = window.pdfjsLib;

const PdftoImage = () => {
  const [pdf, setPdf] = useState("");
  const [width, setWidth] = useState(0);
  const [images, setImages] = useState([]);
  const [height, setHeight] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfRendering, setPdfRendering] = useState("");
  const [pageRendering, setPageRendering] = useState("");

  async function showPdf(event) {
    try {
      setPdfRendering(true);
      const file = event.target.files[0];
      const uri = URL.createObjectURL(file);
      var _PDF_DOC = await PDFJS.getDocument({ url: uri });
      setPdf(_PDF_DOC);
      setPdfRendering(false);
      document.getElementById("file-to-upload").value = "";
    } catch (error) {
      alert(error.message);
    }
  }

  function changePage() {
    setCurrentPage();
  }

  async function renderPage() {
    setPageRendering(true);
    const imagesList = [];
    const canvas = document.createElement("canvas");
    canvas.setAttribute("className", "canv");
    let canv = document.querySelector(".canv");

    for (let i = 1; i <= pdf.numPages; i++) {
      var page = await pdf.getPage(i);
      var viewport = page.getViewport({ scale: 1 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      var render_context = {
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      };
      console.log("page length", pdf.numPages);
      setWidth(viewport.width);
      setHeight(viewport.height);
      await page.render(render_context).promise;
      let img = canvas.toDataURL("image/png");
      imagesList.push(img);
    }
    setImages(imagesList);
    setPageRendering(false);
  }

  useEffect(() => {
    pdf && renderPage();
    // eslint-disable-next-line
  }, [pdf, currentPage]);

  return (
    <div className="pt-28">
      <div className="container mx-auto">
        <input
          type="file"
          id="file-to-upload"
          onChange={showPdf}
          className="my-4"
        />
        {pdfRendering && <div>Loading PDF...</div>}
        {!pdfRendering && (
          <div>
            {/* Display PDF pages here */}
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Page ${index + 1}`}
                className="my-4"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PdftoImage;
