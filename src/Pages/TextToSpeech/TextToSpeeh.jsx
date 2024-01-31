// eslint-disable-next-line no-unused-vars

import Swal from "sweetalert2";
import { Card } from "keep-react";
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
import {
  FaCopy,
  FaMicrophone,
  FaMicrophoneSlash,
  FaWindowRestore,
} from "react-icons/fa";
const SpeechToText = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  SpeechRecognition.startListening({ continuous: true });

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
    <Card className="md:p-6 p-5 max-w-lg ">
      <div className="pt-24 mt-14 ">
        <div className="text-center">
          <div className="mt-4">
            {/* Conditionally render microphone icon based on 'listening' state */}
            <h1>
              Micophone is{" "}
              <FontAwesomeIcon
                icon={listening ? faMicrophone : faMicrophoneSlash}
              />
            </h1>
          </div>

          {/* ---------------------------------button -area------------ */}
          <Card.Container className="circled gap-4 items-center justify-center divide-x divide-metal-200 rounded-md border border-metal-200 p-1 md:p-2">
            <div className="mx-auto gap-4 inline-flex ">
              {/* ------------start button--------- */}
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
              {/* -------stop----------- */}

              {/* <Button
                onClick={SpeechRecognition.stopListening}
                type="primary"
                size="md"
              >
                <span className="pr-2">
                  <FaMicrophoneSlash size={16} />
                </span>
                Stop
              </Button> */}

              {/* --------------resert--------- */}
              <Button onClick={resetTranscript} type="primary" size="md">
                <span className="pr-2">
                  <FaWindowRestore size={16} />
                </span>
                Reset
              </Button>
            </div>
          </Card.Container>
        </div>

        {/* -------------text area---------- */}
        <div>
          <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
              <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600"></div>

              {/* -------------language dropdown---------- */}
              <div className="mb-4">
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Language:
                </label>
                <select
                  id="language"
                  name="language"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                </select>
              </div>
              {/* ----------copy button------- */}

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

              <div
                id="tooltip-fullscreen"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Show full screen
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
            <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
              <label htmlFor="editor" className="sr-only">
                Publish post
              </label>
              <textarea
                id="editor"
                rows="8"
                value={transcript}
                className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                placeholder="Write an article..."
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SpeechToText;
