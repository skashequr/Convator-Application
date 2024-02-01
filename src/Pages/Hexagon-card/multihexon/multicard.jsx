import "./multaicard.css";
import imgedit from "../../../assets/icons/image edit.png";
import pdfview from "../../../assets/icons/pdf.png";
import { Link } from "react-router-dom";
import imgpdf from "../../../assets/icons/ybdodnload.png";
import voicetotext from "../../../assets/icons/Textg.png";
// import massage from "../../../assets/icons";
const MultiHexon = () => {
  return (
    <div className="">
      <ul className="hexagon-grid-container text-black">
        {/* -----------------img edit----------------- */}
        
          <li className="hexagon hexagon-green">
          <Link to="/editimg">
            <div className="hexagon-inner bg-[cardBgHexaPrimary]">
              <img className="hexagon-avatar-img" src={imgedit} />
              <span className="hexagon-name">Image editing</span>
              <span className="hexagon-metric-label">
                Image file to pdf convert
              </span>
            </div>
            </Link>
          </li>
        
        {/* ---------------- image to pdf--------------- */}
        
          <li className="hexagon hexagon-green">
          <Link to="/imgtopdf">
            <div className="hexagon-inner">
              <img className="hexagon-avatar-img" src={pdfview} />
              <span className="hexagon-name">Pdf view</span>
              <span className="hexagon-metric-label">Easy way pdf view</span>
            </div>
            </Link>
          </li>
       
        {/* ------------------------ yb download ------------------------ */}
       
          <li className="hexagon hexagon-green">
          <Link>
            <div className="hexagon-inner">
              <img className="hexagon-avatar-img" src={imgpdf} />
              <span className="hexagon-name">Youtube video mp3 </span>
              <span className="hexagon-metric-label">
                Yb Video mp3 download
              </span>
            </div>
            </Link>
          </li>
        
        {/* --------------voice to text----------- */}
        
          <li className="hexagon hexagon-blue">
          <Link to="/speech">
            <div className="hexagon-inner">
              <img className="hexagon-avatar-img" src={voicetotext} />
              <span className="hexagon-name">Voice to text</span>
              <span className="hexagon-metric-label">Voice convert text</span>
            </div>
            </Link>
          </li>
        

        {/* -----------------watermark-------------------------- */}
       
          <li className="hexagon hexagon-yellow">
          <Link to="/watermark">
            <div className="hexagon-inner">
              <img className="hexagon-avatar-img" src="" />
              <span className="hexagon-name">watermarked-Pdf</span>
              <span className="hexagon-metric-label">Progress to Goal</span>
            </div>
            </Link>
          </li>
       

        {/* ---------------- text-vouice-------*/}
      
          <li className="hexagon hexagon-yellow">
          <Link to="/text">
            <div className="hexagon-inner">
              <img className="hexagon-avatar-img" src="" />
              <span className="hexagon-name">Text-to-Voice</span>
              <span className="hexagon-metric-label">Text-to-voice</span>
            </div>
            </Link>
          </li>
        
        {/* ---------------5------------- */}
       
       <li className="hexagon hexagon-yellow">
       <Link to="imgToWord">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">imgToWord</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
          </Link>
        </li>
       
        {/* ------------------6--------------- */}
       
        <li className="hexagon hexagon-yellow">
        <Link to="/ee">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Ppt to pdf</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
          </Link>
        </li>
        
        {/* ---------------------7------------------ */}
        <li className="hexagon hexagon-yellow">
          <Link to="/watermark">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Watermark</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
          </Link>
        </li>
        {/* --------------8----------------------- */}
        <li className="hexagon hexagon-yellow">
          <Link to="/pdfToText">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Pdf To Text</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
          </Link>
        </li>
        <Link to="/pdfToImg">
        <li className="hexagon hexagon-yellow">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Pdf to img</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
        </li>
        </Link>

        <li className="hexagon hexagon-yellow">
          <Link to="/pngtojpg">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Png to Jpg</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
          </Link>
        </li>
        <li className="hexagon hexagon-yellow">
          <Link to="/jpgtopng">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Jpg to Png</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
          </Link>
        </li>
        <li className="hexagon hexagon-yellow">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
        </li>
        <li className="hexagon hexagon-yellow">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
        </li>

        <li className="hexagon hexagon-red">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Coachability</span>
          </div>
        </li>
        <li className="hexagon hexagon-red">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Coachability</span>
          </div>
        </li>
        <li className="hexagon hexagon-red">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Coachability</span>
          </div>
        </li>
        <li className="hexagon hexagon-red">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Coachability</span>
          </div>
        </li>
        <li className="hexagon hexagon-red">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Coachability</span>
          </div>
        </li>
        <li className="hexagon hexagon-red">
          <div className="hexagon-inner">
            <img className="hexagon-avatar-img" src="" />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Coachability</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MultiHexon;
