import Swal from "sweetalert2";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
// ----------font asewome----------
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";

import { Button } from "keep-react";
import { FaCopy, FaMicrophone, FaWindowRestore } from "react-icons/fa";
import { saveAs } from "file-saver";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useEffect, useState } from "react";
import Helpdesk from "../../Component/Shared/Helpdesk";

const SpeechToText = () => {
  const [pdfText, setPdfText] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  SpeechRecognition.startListening({ continuous: true });
  useEffect(() => {
    if (transcript) {
      setPdfText(transcript);
    }
  }, [transcript]);
  //---------------------Download as text file------------
  const downloadTextFile = () => {
    if (!transcript) {
      Swal.fire({
        icon: "error",
        title: "No Text Available",
        text: "There is no text to download.",
      });
      return;
    }

    const element = document.createElement("a");
    const file = new Blob([transcript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  const generatePdf = async () => {
    if (!pdfText) {
      Swal.fire({
        icon: "error",
        title: "No Text Available",
        text: "There is no text to generate PDF.",
      });
      return;
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;

    // ------------- Helvetica font-----------
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    //---------- 14 words per line----------
    const words = pdfText.split(" ");
    let lines = [];
    let currentLine = "";
    for (const word of words) {
      if ((currentLine + " " + word).split(" ").length <= 14) {
        currentLine += (currentLine === "" ? "" : " ") + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine !== "") {
      lines.push(currentLine);
    }

    // -----------Draw the text on the page---------------
    let y = height - 50; // Initial y position
    for (const line of lines) {
      const textWidth = helveticaFont.widthOfTextAtSize(line, fontSize);
      page.drawText(line, {
        x: (width - textWidth) / 2,
        y,
        size: fontSize,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      y -= fontSize + 5; // Adjust spacing between lines as needed
    }

    // Save and download the PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "transcript.pdf");
  };

  const handleTextareaChange = (event) => {
    setPdfText(event.target.value);
  };
  // ----------copy text--------
  const copyToClipboard = () => {
    navigator.clipboard.writeText(transcript);
    Swal.fire({
      icon: "success",
      title: "Text Copied!",
      text: "The text has been copied to the clipboard.",
    });
  };

  // ------------language ------
  const handleChangeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    // Set the language for speech recognition
    SpeechRecognition.startListening({
      continuous: true,
      language: selectedLanguage,
    });
  };

  // ---------broswer support-----------
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesnt support speech recognition.</span>;
  }
  return (
    <div>
      <div className="pt-28 text-TextColor shadow-2xl">
        {/* ----------------to and card---------------- */}
        <div className="text-center shadow-lg">
          <div className="mt-4">
            {/* ------Conditionally render microphone icon based on listening state -----*/}
            <h1>
              Micophone Conditions{" "}
              <FontAwesomeIcon
                icon={listening ? faMicrophone : faMicrophoneSlash}
              />
            </h1>
          </div>

          {/* --------------------------------- button-area ------------ */}

          <div className="mx-auto gap-4 inline-flex ">
            {/* ------------   start button  --------- */}
            <Button
              onClick={SpeechRecognition.startListening}
              type="primary"
              size="md"
            >
              <span className="pr-2">
                <FaMicrophone size={16} />
              </span>
              Start
            </Button>

            {/* --------------resert--------- */}
            <Button onClick={resetTranscript} type="primary" size="md">
              <span className="pr-2">
                <FaWindowRestore size={16} />
              </span>
              Reset
            </Button>
          </div>
        </div>

        {/* -------------text area---------- */}

        <div className="w-full mb-4 border border-blue-200 rounded-lg shadow-2xl bg-AllCard text-AllTitle   ">
          <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
            <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600"></div>

            {/* -------------language dropdown---------- */}
            <div className="mb-4">
              <label htmlFor="language" className="block text-lg font-medium ">
                Select Language:
              </label>
              <select
                id="language"
                name="language"
                className="mt-1 block w-full p-2 border border-green-300 rounded-md bg-blue-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChangeLanguage}
              >
                <option value="en-US">English (US)</option>
                <option value="bn-BD">বাংলা (Bangla)</option>
                <option value="es-ES">Español (España)</option>
                <option value="bn-BD">বাংলা (Bangla)</option>
                <option value="hi-IN">हिन्दी (Hindi)</option>
                <option value="ur-PK">اردو (Pakistan)</option>
                <option value="zh-CN">中文 (Chinese)</option>
                <option value="ru-RU">русский (Russian)</option>
                <option value="ja-JP">日本語 (Japanese)</option>
                <option value="fr-FR">Français (French)</option>
                <option value="de-DE">Deutsch (German)</option>

                <option value="it-IT">Italiano (Italian)</option>
              </select>
            </div>
            {/* ----------copy,text button------- */}
            <div className="circled gap-3  mx-auto flex  items-center justify-center divide-x divide-metal-200 rounded-md border border-metal-200 p-1 md:p-2">
              <Button
                onClick={copyToClipboard}
                size="md"
                type="primary"
                circle={true}
              >
                <span>
                  <FaCopy size={24} />
                </span>
              </Button>
              {/*-------------- download text button--------- */}
              <Button onClick={downloadTextFile} size="md" type="primary">
                Donload text
              </Button>
              {/* ----------download pdf------ */}
              <Button onClick={generatePdf} size="md" type="primary">
                Download as PDF
              </Button>
            </div>

            {/* ------------------ */}
            <div
              id="tooltip-fullscreen"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300  rounded-lg shadow-sm opacity-0 tooltip "
            >
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
          <div className="px-4 py-2  rounded-b-lg shadow-lg p-3 ">
            <label htmlFor="editor" className="sr-only">
              Publish post
            </label>
            <textarea
              id="editor"
              rows="8"
              value={transcript}
              onChange={handleTextareaChange}
              className="block w-full  text-sm border-0  focus:ring-0 "
              placeholder="voice listing..."
              required
            ></textarea>
            {/* -----------issue feedback----------- */}
            <div className="circled mx-auto flex items-center justify-center divide-x divide-metal-200 rounded-md border border-metal-200 p-1 md:p-2">
              <Helpdesk className=" text-center "></Helpdesk>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;
