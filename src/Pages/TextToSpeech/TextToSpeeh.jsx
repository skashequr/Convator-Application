// eslint-disable-next-line no-unused-vars

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
  FaMicrophone,
  FaMicrophoneSlash,
  FaMousePointer,
  FaWindowRestore,
} from "react-icons/fa";
const SpeechToText = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesnt support speech recognition.</span>;
  }

  return (
    <Card className="md:p-6 p-5 max-w-lg">
      <div className="pt-24 mt-14 ">
        <div className="text-center">
          <div className="mt-4">
            {/* Conditionally render microphone icon based on 'listening' state */}
            <FontAwesomeIcon
              icon={listening ? faMicrophone : faMicrophoneSlash}
            />
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

              <Button
                onClick={SpeechRecognition.stopListening}
                type="primary"
                size="md"
              >
                <span className="pr-2">
                  <FaMicrophoneSlash size={16} />
                </span>
                Stop
              </Button>

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
              <button
                type="button"
                data-tooltip-target="tooltip-fullscreen"
                className="p-2 text-gray-500 rounded cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 19 19"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"
                  />
                </svg>
                <span className="sr-only">Full screen</span>
              </button>
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

        {/* <textarea
        id="message"
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={transcript}
      ></textarea> */}
      </div>
    </Card>
  );
};

export default SpeechToText;
