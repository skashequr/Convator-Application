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

import YbVideoToaudio from "../Pages/Yb-vid-mp3/YbVideoToaudio";
import OpenChat from "../Pages/Massage/OpenChat";
import WelcomeMassage from "../Pages/Massage/WelcomeMassage";

import Users from "../Pages/Massage/Users";
import ImgToText from "../Pages/Features/ImgToText/ImgToText";

// import SpeechToText from "../Pages/TextToSpeech/TextToSpeeh";
import PdfEditor from "../Pages/Features/PdfEaditor/PdfEaditor";
// import PdfToImg from "../Pages/PdfToJpj/PdftoImage";
// import Converterimg from "../Pages/PdfToJpj/Conveter";

import JpgToPngConverter from "../Pages/JpgToPng/JpgToPng";
import TIFFtoJPGConverter from "../Pages/TiffImgToJpg/TiffImgToJpg";
import TextToVoice from "../Pages/textToVoice/TextToVoice";
import SpeechToText from "../Pages/VoicetoText/TextToSpeeh";

import QRCodeGenerator from "../Pages/Qrcode/Qrcode";

import Dashboard from "../Pages/Dashboad/Dashboad/Dashboad";
import DashboadHome from "../Pages/Dashboad/ElementDashboad/HomeDeshboad/HomeDeshboad";
import ImageResizeTool from "../Image-Resize/ImageResize";
import ExcelToJson from "../Pages/ExcelTojson/ExcelTojson";
import ExcelToHtmlTable from "../Pages/ExcelToHtml/ExcelToHtml";
import PngToJpgConverter from "../Pages/PngToJpg/PngToJpg";
import PdftoImage from "../Pages/PdfToJpj/PdftoImage";
import UserManage from "../Pages/Dashboad/ElementDashboad/Usermanage/UserManage";
import WordToPdf from "../Pages/WordtoPdf/WordToPdf";
import DsahAllUsers from "../Pages/Dashboad/Dashboad/AllUsers";
import AddWatermarkToPDF from "../Pages/WaterMark/WaterMArk";
import PptPdf from "../Pages/Features/PptToPdf/PptPdf";

import HtmlToPdf from "../Pages/HtmlToPdf/Htmlpdf";
import HtmlToWord from "../Pages/HtmlToword/HtmlToWord";

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
        path: "/exceltojson",
        element: <ExcelToJson></ExcelToJson>,
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
        element: <AddWatermarkToPDF></AddWatermarkToPDF>,
      },
      {
        path: "/ee",
        element: <PptPdf></PptPdf>,
      },
      {
        path: "/pdfToText",
        element: <PdfEditor></PdfEditor>,
      },
      {
        path: "/pdfToImg",
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
        path: "/qrcode",
        element: <QRCodeGenerator></QRCodeGenerator>,
      },
      {
        path: "/imagresize",
        element: <ImageResizeTool></ImageResizeTool>,
      },
      {
        path: "/exceltohtml",
        element: <ExcelToHtmlTable></ExcelToHtmlTable>,
      },
      {
        path: "PdfToImage",
        element: <PdftoImage></PdftoImage>,
      },
      {
        path: "WordToPdf",
        element: <WordToPdf></WordToPdf>,
      },

      {
        path: "html",
        element: <HtmlToPdf></HtmlToPdf>,
      },
      {
        path: "word",
        element: <HtmlToWord></HtmlToWord>,
      },

      // ---------------- Massageing routes --------------------
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
  // -----------  DashBoad Router ---------------
  {
    path: "/dashboad",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "homedes",
        element: <DashboadHome></DashboadHome>,
      },
    ],
  },
]);
