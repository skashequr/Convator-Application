import PdfViewer from "../Pages/PdfToJpj/Conveter";
import App from "../Pages/PdfToJpj/PdftoImage";

const Homepage = () => {
  return (
    <div>
      <div>
        <App></App>
      </div>
      <PdfViewer></PdfViewer>
    </div>
  );
};

export default Homepage;
