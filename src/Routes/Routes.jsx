import { createBrowserRouter } from "react-router-dom";

// import Homepage from "../Homepage/Homepage";
import EditImg from "../Component/EditImg";
import Login from "../Pages/Authentication/Login/Login";
import Signup from "../Pages/Authentication/SignIn/Signup";
import ErrorPage from "../Pages/Errorpage/Errorpage";
import Pdfimg from "../Component/Image to Pdf/ImageToPDF";
import AboutUs from "../Pages/AboutUs/AboutUs";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Features from "../Pages/Features/Features";
import PdfWatermark from "../Pages/Watermarkpdf/Watermarkpdf";
import YbVideoToaudio from "../Pages/Yb-vid-mp3/YbVideoToaudio";
import OpenChat from "../Pages/Massage/OpenChat";
import WelcomeMassage from "../Pages/Massage/WelcomeMassage";
import Pdfview from "../Pages/PdfViwer/PdfViwer";
import MassageLogin from "../Pages/Massage/MassageLogin";

import Users from "../Pages/Massage/Users";
import ImgToText from "../Pages/Features/ImgToText/ImgToText";

import PdfWatermarkApp from "../Pages/Watermarkpdf/Watermarkpdf";
import MyComponent from "../Pages/Features/PptToPdf/PptFile";

// import SpeechToText from "../Pages/TextToSpeech/TextToSpeeh";
import PdfEditor from "../Pages/Features/PdfEaditor/PdfEaditor";
import PdfToImg from "../Pages/PdfToJpj/PdftoImage";
// import Converterimg from "../Pages/PdfToJpj/Conveter";
import PngToJpgConverter from "../Pages/PngToJpg/PngToJpg";
import JpgToPngConverter from "../Pages/JpgToPng/JpgToPng";
import TIFFtoJPGConverter from "../Pages/TiffImgToJpg/TiffImgToJpg";
import TextToVoice from "../Pages/textToVoice/TextToVoice";
import SpeechToText from "../Pages/VoicetoText/TextToSpeeh";
import Testing from "../Pages/test";

// import SpeechToText from "../Pages/VoicetoText/TextToSpeeh";

// import PowerPointToPdf from "../Pages/PowerPointToPdf/PowerPointToPdf";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/aboutUs",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/editimg",
        element: <EditImg></EditImg>,
      },
      {
        path: "/imgtopdf",
        element: <Pdfimg></Pdfimg>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/aboutUs",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/feateres",
        element: <Features></Features>,
      },
      {
        path: "/ybvidtoaudio",
        element: <YbVideoToaudio></YbVideoToaudio>,
      },
      {
        path: "/speech",
        element: <SpeechToText></SpeechToText>,
      },
      {
        path: "pdfview",
        element: <Pdfview></Pdfview>,
      },
      {
        path: "/watermark",
        element: <PdfWatermark></PdfWatermark>,
      },
      {
        path: "/text",
        element: <TextToVoice></TextToVoice>,
      },
      {
        path: "/youtubemp3",
        element: <YbVideoToaudio></YbVideoToaudio>,
      },
      {
        path: "/imgToWord",
        element: <ImgToText></ImgToText>,
      },

      {
        path: "/watermark",
        element: <PdfWatermarkApp></PdfWatermarkApp>,
      },
      {
        path: "/ee",
        element: <MyComponent></MyComponent>,
      },
      {
        path: "/pdfToText",
        element: <PdfEditor></PdfEditor>,
      },
      {
        path: "/pdfToImg",
        element: <PdfToImg></PdfToImg>,
      },
      {
        path: "/pngtojpg",
        element: <PngToJpgConverter></PngToJpgConverter>,
      },
      {
        path: "/jpgtopng",
        element: <JpgToPngConverter></JpgToPngConverter>,
      },
      {
        path: "/tifftojpg",
        element: <TIFFtoJPGConverter></TIFFtoJPGConverter>,
      },
      {
        path: "/test",
        element: <Testing></Testing>,
      },

      // ---------------- Massageing routes --------------------
      {
        path: "/massage",
        element: <MassageLogin></MassageLogin>,
      },
      {
        path: "/massage/welcome",
        element: <WelcomeMassage></WelcomeMassage>,
      },
      {
        path: "/massage/dehed/swgs",
        element: <OpenChat></OpenChat>,
      },
      {
        path: "massage/users/massage/shearefile/:_id",
        element: <OpenChat></OpenChat>,
      },
      {
        path: "/massage/users",
        element: <Users></Users>,
      },
      {
        path: "massage/groups",
        element: " ",
      },
      {
        path: "massage/create-groups",
        element: "",
      },
    ],
  },
]);
