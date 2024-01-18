import Testimonials from "../Component/Testemonial/Testimonials";
import PdfViewer from "../Pages/PdfToJpj/Conveter";
import App from "../Pages/PdfToJpj/PdftoImage";

const Homepage = () => {
  return (
    <div>
      <div>
        <App></App>
      </div>
      <PdfViewer></PdfViewer>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Homepage;
