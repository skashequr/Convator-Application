import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import jsPDF from "jspdf";
// import { Button } from "keep-react";
// import { TextInput } from "keep-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./pdfview.css";
import { Pagination, Navigation } from "swiper/modules";
import { Helmet } from "react-helmet-async";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Pdfview = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [file, setFile] = useState(null);
  //   const [watermarkText, setWatermarkText] = useState("");

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  return (
    <div className="pt-28 p-4 mt-6">
      <Helmet>
        <title>Pdf viewer</title>
      </Helmet>
      <div className="flex items-center justify-center bg-grey-lighter w-full mt-6">
        <label
          className="w-96  h-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg 
        shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white"
        >
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-base leading-normal">Select Pdf file</span>
          <input type="file" onChange={onFileChange} className="hidden" />
        </label>
      </div>

      {file && (
        <div className="mt-2">
          {/*------------  swiper slider ---------- */}
          <div className=" mt-10 ">
            {/* ------------- */}
            <Swiper
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {[...Array(numPages)].map((_, index) => (
                <SwiperSlide key={index + 1}>
                  <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={index + 1} />
                  </Document>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pdfview;
