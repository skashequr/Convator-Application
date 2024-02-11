import "./multaicard.css";
import imgedit from "../../../assets/icons/image edit.png";
import pdfview from "../../../assets/banner-image/file-pdf-solid-240.png";
import { Link } from "react-router-dom";
import jpjtopng from "../../../assets/icons/jpj-to-png.png";
import pngtojpeg from "../../../assets/icons/jpeg-to-png.png";
import voicetotext from "../../../assets/icons/Textg.png";
import textVoice from "../../../assets/icons/text to speech.png";
import imgTotext from "../../../assets/icons/img-text.png";
import scanner from "../../../assets/icons/scanner.png";
import resizeimg from "../../../assets/icons/resizeimage.png";
import excelTojson from "../../../assets/icons/exceltojson.png";
import exceltohtml from "../../../assets/icons/htmltoexcvel.png";
const MultiHexon = () => {
  return (
    <div className="">
      <ul className="hexagon-grid-container text-white ">
        {/* -----------------img edit----------------- */}
        <Link to="/editimg">
          <li className="hexagon hexagon-green">
            <div className="hexagon-inner bg-[cardBgHexaPrimary]">
              <img className="hexagon-avatar-img" src={imgedit} />
              <span className="hexagon-name">Image editing</span>
              <span className="hexagon-metric-label">
                Image file to pdf convert
              </span>
            </div>
          </li>
        </Link>
        {/* ---------------- image to pdf--------------- */}
        <Link to="/imgtopdf">
          <li className="hexagon hexagon-green">
            <div className="hexagon-inner">
              <img className="hexagon-avatar-img" src={pdfview} />
              <span className="hexagon-name">Image to pdf</span>
              <span className="hexagon-metric-label">Easy way pdf view</span>
            </div>
          </li>
        </Link>
        {/* ------------------------ jPJ TO PNG ------------------------ */}
        <Link to="/jpgtopng">
          <li className="hexagon hexagon-green">
            <div className="hexagon-inner">
              <img className="hexagon-avatar-img" src={jpjtopng} />
              <span className="hexagon-name">JPEG Convert PNG</span>
              <span className="hexagon-metric-label">easy convert in png</span>
            </div>
          </li>
        </Link>
        {/* -------------- voice to text ----------- */}
        <Link to="/speech">
          <li className="hexagon hexagon-blue">
            <div className="hexagon-inner">
              <img className="hexagon-avatar-img" src={voicetotext} />
              <span className="hexagon-name">Voice to text</span>
              <span className="hexagon-metric-label">Voice convert text</span>
            </div>
          </li>
        </Link>

        {/* -----------------png-to-jpg-------------------------- */}
        <Link to="/pngtojpg">
          <li className="hexagon hexagon-yellow">
            <div className="hexagon-inner">
              <img className="hexagon-avatar-img" src={pngtojpeg} />
              <span className="hexagon-name">Png to jpeg</span>
              <span className="hexagon-metric-label">Progress easy way</span>
            </div>
          </li>
        </Link>

        {/* ---------------- text-voice-------*/}
        <Link to="/text">
          <li className="hexagon hexagon-yellow">
            <div className="hexagon-inner">
              <img className="hexagon-avatar-img" src={textVoice} />
              <span className="hexagon-name">Text-to-Voice</span>
              <span className="hexagon-metric-label">Text-to-voice</span>
            </div>
          </li>
        </Link>
        {/* ---------------image to text ------------- */}
        <li className="hexagon hexagon-yellow">
          <Link to="/imgToWord">
            <div className="hexagon-inner">
              <img className="hexagon-avatar-img" src={imgTotext} />
              <span className="hexagon-name">Image to word</span>
              <span className="hexagon-metric-label">Image to document</span>
            </div>
          </Link>
        </li>
        {/* ------------------Resize image--------------- */}
        <li className="hexagon hexagon-yellow">
          <Link to="/imagresize">
            <div className="hexagon-inner">
              <img className="hexagon-avatar-img" src={resizeimg} />
              <span className="hexagon-name">Image-Resize</span>
              <span className="hexagon-metric-label">Image quality change</span>
            </div>
          </Link>
        </li>
        {/* --------------------- qr code  ------------------ */}
        <li className="hexagon hexagon-yellow">
          <Link to="/qrcode">
            <div className="hexagon-inner">
              <img className="hexagon-avatar-img" src={scanner} />
              <span className="hexagon-name">QR Code </span>
              <span className="hexagon-metric-label">QR Code Generator</span>
            </div>
          </Link>
        </li>
        {/* --------------EXCEL TO JSON----------------------- */}
        <li className="hexagon hexagon-yellow">
          <Link to="/exceltojson">
            <div className="hexagon-inner">
              <img className="hexagon-avatar-img" src={excelTojson} />
              <span className="hexagon-name">Excel to Json</span>
              <span className="hexagon-metric-label">Progress to Goal</span>
            </div>
          </Link>
        </li>
        {/* ---------Excel to HTML------------ */}
        <li className="hexagon hexagon-yellow">
          <Link to="/exceltohtml">
            <div className="hexagon-inner">
              <img className="hexagon-avatar-img" src={exceltohtml} />
              <span className="hexagon-name">Excel to HTML</span>
              <span className="hexagon-metric-label">Progress to Goal</span>
            </div>
          </Link>
        </li>

        <li className="hexagon hexagon-yellow">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Conveter app</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
        </li>
        <li className="hexagon hexagon-yellow">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Conveter app</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
        </li>
        <li className="hexagon hexagon-yellow">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Conveter app</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
        </li>
        <li className="hexagon hexagon-yellow">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Conveter app</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
        </li>

        <li className="hexagon hexagon-red">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Conveter app</span>
            <span className="hexagon-metric-label">Coachability</span>
          </div>
        </li>
        <li className="hexagon hexagon-red">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Conveter app</span>
            <span className="hexagon-metric-label">Coachability</span>
          </div>
        </li>
        <li className="hexagon hexagon-red">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Conveter app</span>
            <span className="hexagon-metric-label">Coachability</span>
          </div>
        </li>
        <li className="hexagon hexagon-red">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Conveter app</span>
            <span className="hexagon-metric-label">Coachability</span>
          </div>
        </li>
        <li className="hexagon hexagon-red">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Conveter app</span>
            <span className="hexagon-metric-label">Coachability</span>
          </div>
        </li>
        <li className="hexagon hexagon-red">
          <div className="hexagon-inner ">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Conveter app</span>
            <span className="hexagon-metric-label">Coachability</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MultiHexon;
