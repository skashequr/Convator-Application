import "./multaicard.css";
import imgedit from "../../../assets/icons/image edit.png";
import pdfview from "../../../assets/icons/pdf.png";
import { Link } from "react-router-dom";
import imgpdf from "../../../assets/icons/ybdodnload.png";
import voicetotext from "../../../assets/icons/Textg.png";
// import massage from "../../../assets/icons";
const MultiHexon = () => {
  return (
    <div className="#DAF5FF">
      <ul className="hexagon-grid-container text-black">
        {/* -----------------img edit----------------- */}
        <Link to="/editimg">
          <li className="hexagon hexagon-green">
            <div className="hexagon-inner">
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
              <span className="hexagon-name">Pdf view</span>
              <span className="hexagon-metric-label">Easy way pdf view</span>
            </div>
          </li>
        </Link>
        {/* ------------------------ yb download ------------------------ */}
        <Link>
          <li className="hexagon hexagon-green">
            <div className="hexagon-inner">
              <img className="hexagon-avatar-img" src={imgpdf} />
              <span className="hexagon-name">Youtube video mp3 </span>
              <span className="hexagon-metric-label">
                Yb Video mp3 download
              </span>
            </div>
          </li>
        </Link>
        {/* --------------voice to text----------- */}
        <Link to="/speech">
          <li className="hexagon hexagon-blue">
            <div className="hexagon-inner">
              <img className="hexagon-avatar-img" src={voicetotext} />
              <span className="hexagon-name">Voice to text</span>
              <span className="hexagon-metric-label">Voice convert text</span>
            </div>
          </li>
        </Link>

        {/* -----------------4-------------------------- */}
        <Link to="/watermark">
          <li className="hexagon hexagon-yellow">
            <div className="hexagon-inner">
              <img
                className="hexagon-avatar-img"
                src="https://randomuser.me/api/portraits/men/32.jpg"
              />
              <span className="hexagon-name">watermarked-Pdf</span>
              <span className="hexagon-metric-label">Progress to Goal</span>
            </div>
          </li>
        </Link>

        {/* ---------------- */}
        <li className="hexagon hexagon-yellow">
          <div className="hexagon-inner">
            <img
              className="hexagon-avatar-img"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
        </li>
        {/* ---------------5------------- */}
        <li className="hexagon hexagon-yellow">
          <div className="hexagon-inner">
            <img
              className="hexagon-avatar-img"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
        </li>
        {/* ------------------6--------------- */}
        <li className="hexagon hexagon-yellow">
          <div className="hexagon-inner">
            <img
              className="hexagon-avatar-img"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
        </li>
        {/* ---------------------7------------------ */}
        <li className="hexagon hexagon-yellow">
          <div className="hexagon-inner">
            <img
              className="hexagon-avatar-img"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
        </li>
        {/* --------------8----------------------- */}
        <li className="hexagon hexagon-yellow">
          <div className="hexagon-inner">
            <img
              className="hexagon-avatar-img"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
        </li>
        <li className="hexagon hexagon-yellow">
          <div className="hexagon-inner">
            <img
              className="hexagon-avatar-img"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
        </li>

        <li className="hexagon hexagon-yellow">
          <div className="hexagon-inner">
            <img
              className="hexagon-avatar-img"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
        </li>
        <li className="hexagon hexagon-yellow">
          <div className="hexagon-inner">
            <img
              className="hexagon-avatar-img"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
        </li>
        <li className="hexagon hexagon-yellow">
          <div className="hexagon-inner">
            <img
              className="hexagon-avatar-img"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
        </li>
        <li className="hexagon hexagon-yellow">
          <div className="hexagon-inner">
            <img
              className="hexagon-avatar-img"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Progress to Goal</span>
          </div>
        </li>

        <li className="hexagon hexagon-red">
          <div className="hexagon-inner">
            <img
              className="hexagon-avatar-img"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Coachability</span>
          </div>
        </li>
        <li className="hexagon hexagon-red">
          <div className="hexagon-inner">
            <img
              className="hexagon-avatar-img"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Coachability</span>
          </div>
        </li>
        <li className="hexagon hexagon-red">
          <div className="hexagon-inner">
            <img
              className="hexagon-avatar-img"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Coachability</span>
          </div>
        </li>
        <li className="hexagon hexagon-red">
          <div className="hexagon-inner">
            <img
              className="hexagon-avatar-img"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Coachability</span>
          </div>
        </li>
        <li className="hexagon hexagon-red">
          <div className="hexagon-inner">
            <img
              className="hexagon-avatar-img"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Coachability</span>
          </div>
        </li>
        <li className="hexagon hexagon-red">
          <div className="hexagon-inner">
            <img
              className="hexagon-avatar-img"
              src="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <span className="hexagon-name">Bruce Wayne</span>
            <span className="hexagon-metric-label">Coachability</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MultiHexon;
