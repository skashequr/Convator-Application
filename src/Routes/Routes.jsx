import { createBrowserRouter } from "react-router-dom";

import EditImg from "../Component/EditImg";
import Login from "../Pages/Authentication/Login/Login";
import Signup from "../Pages/Authentication/SignIn/Signup";
import ErrorPage from "../Pages/Errorpage/Errorpage";
import Pdfimg from "../Component/Image to Pdf/ImageToPDF";
import AboutUs from "../Pages/AboutUs/AboutUs";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Features from "../Pages/Features/Features";

import OpenChat from "../Pages/Massage/OpenChat";
import WelcomeMassage from "../Pages/Massage/WelcomeMassage";

import Users from "../Pages/Massage/Users";
import ImgToText from "../Pages/Features/ImgToText/ImgToText";

import PdfEditor from "../Pages/Features/PdfEaditor/PdfEaditor";

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

import AddWatermarkToPDF from "../Pages/WaterMark/WaterMArk";
import PptPdf from "../Pages/Features/PptToPdf/PptPdf";

import HtmlToPdf from "../Pages/HtmlToPdf/Htmlpdf";
import HtmlToWord from "../Pages/HtmlToword/HtmlToWord";
import { AdminePannelTableComponent } from "../Pages/Dashboad/AdminePanelComponent/AdminPannelComponent";

import ExcelToPdf from "../Pages/ExcelToPdf/ExcelToPdf";
import LockPdf from "../Pages/Lock-Pdf/LockPdf";
import DashUsers from "../Pages/Dashboad/Dashboad/AllUsers";
import PaidUser from "../Pages/Dashboad/PaidUser/PaidUser";
<<<<<<< HEAD
import UserHome from "../Pages/Dashboad/UserDahboad/User-Home/UserHome";
import PrivateRoute from "./Privaterouter";
import OrderSummary from "../Pages/Dashboad/UserDahboad/OrderSummary/OrderSummary";
import UserProfile from "../Pages/Dashboad/UserDahboad/User-Profile/UserProfile";
=======
import PdfToPpt from "../Pages/PdfToPpt/PdfToPpt";
>>>>>>> d06127d073bbd877e1d510ddf933bc1a375a1061

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
        path: "/imgToWord",
        element: <ImgToText></ImgToText>,
      },

      {
        path: "/watermark",
        element: <AddWatermarkToPDF></AddWatermarkToPDF>,
      },
      {
        path: "/wordToPdf",
        element: <PptPdf></PptPdf>,
      },
      {
        path: "/pdfToText",
        element: <PdfEditor></PdfEditor>,
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
        path: "/PdfToImage",
        element: <PdftoImage></PdftoImage>,
      },
      {
        path: "/ExcelToPdf",
        element: <ExcelToPdf></ExcelToPdf>,
      },

      {
        path: "/html",
        element: <HtmlToPdf></HtmlToPdf>,
      },
      {
        path:"/pdfToPpt",
        element: <PdfToPpt></PdfToPpt>
      },
      {
        path: "/word",
        element: <HtmlToWord></HtmlToWord>,
      },

      {
        path: "/lock",
        element: <LockPdf></LockPdf>,
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
        path: "/massage/users/massage/shearefile/:_id",
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
        element: (
          <PrivateRoute>
            <DashboadHome></DashboadHome>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "controlUser",
        element: <DashUsers></DashUsers>,
      },
      {
        path: "adminePannel",
        element: <AdminePannelTableComponent></AdminePannelTableComponent>,
      },
      {
        path: "/dashboad/paidUser",
        element: <PaidUser></PaidUser>,
      },
      {
        path: "/dashboad/UserHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "/dashboad/OrderSummary",
        element: <OrderSummary></OrderSummary>,
      },
      {
        path: "/dashboad/userProfile",
        element: <UserProfile></UserProfile>,
      },
    ],
  },
]);
