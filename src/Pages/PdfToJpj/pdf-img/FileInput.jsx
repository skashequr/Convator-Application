import { useState, useEffect } from "react";
import PDFJS from "pdfjs-dist/es5/build/pdf";
import "pdfjs-dist/web/pdf_viewer.css";
import "./style.css";
const PdfViewer = () => {
  const [pdf, setPdf] = useState("");
  const [width, setWidth] = useState(0);
  const [image, setImage] = useState("");
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

  function changePage(pageNumber) {
    setCurrentPage(pageNumber);
  }

  async function renderPage() {
    setPageRendering(true);

    var page = await pdf.getPage(currentPage);

    var viewport = page.getViewport({ scale: 1 });

    var render_context = {
      canvasContext: document.querySelector("#pdf-canvas").getContext("2d"),
      viewport: viewport,
    };
    console.log("viewport", viewport);
    setWidth(viewport.width);
    setHeight(viewport.height);
    await page.render(render_context);

    var canvas = document.getElementById("pdf-canvas");
    var img = canvas.toDataURL("image/png");
    setImage(img);
    setPageRendering(false);
  }

  useEffect(() => {
    pdf && renderPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdf, currentPage]);

  const handleDownloadImage = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "page_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <input type="file" id="file-to-upload" onChange={showPdf} />
      <div>
        <canvas id="pdf-canvas" width={width} height={height}></canvas>
        {pdfRendering && <div>Loading PDF...</div>}
        {pageRendering && <div>Rendering Page...</div>}
      </div>
      {image && <button onClick={handleDownloadImage}>Download Image</button>}
    </div>
  );
};

export default PdfViewer;
