import { useState, useEffect } from "react";
import "./TexttoVoice.css";
import Swal from "sweetalert2";
import useUserConvertLimit from "../../Hooks/useUserConvertLimit";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const TextToVoice = () => {
  const [speech, setSpeech] = useState(new SpeechSynthesisUtterance());
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [inputText, setInputText] = useState("");
  const axiosPublic = useAxiosPublic();
  const { currentUserConvertLimit, matchPaidStatus, updateValue } =
    useUserConvertLimit();

  useEffect(() => {
    const handleVoicesChanged = () => {
      setVoices(window.speechSynthesis.getVoices());
      setSpeech((prevSpeech) => {
        const newSpeech = new SpeechSynthesisUtterance(prevSpeech.text);
        newSpeech.voice = voices[selectedVoice];
        return newSpeech;
      });
    };

    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [selectedVoice, voices]);

  const handleVoiceChange = (e) => {
    setSelectedVoice(e.target.value);
  };

  const handleTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleButtonClick = async () => {
    if (currentUserConvertLimit > 0 || matchPaidStatus) {
      speech.text = inputText;

      // Convert speech to audio blob
      const audioBlob = await new Promise((resolve) => {
        speech.onend = () => {
          resolve(new Blob([new Uint8Array(speech.audioBuffer)]));
        };
        window.speechSynthesis.speak(speech);
      });

      // Create a link element for download
      const audioUrl = URL.createObjectURL(audioBlob);
      const downloadLink = document.createElement("a");
      downloadLink.href = audioUrl;
      downloadLink.download = "speech_audio.mp3";

      // Append the link to the document and trigger the click event
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // Clean up by removing the link
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(audioUrl);

      // --------------------------------------AccessCondition--Start-------------------------------------
      {
        currentUserConvertLimit > 0 &&
          axiosPublic
            .patch(`/user/update?email=${user?.email}`, {
              ConvertLimit: updateValue,
            })
            .then((res) => {
              console.log(res);
              reload();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "You lose a Convert limitation",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              console.log(err);
            });
      }
    } else {
      return Swal.fire({
        position: "top-end",
        icon: "error",
        title: "You have to get Subscription",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    // --------------------------------------AccessCondition--End-------------------------------------
  };

  return (
    <div className="hero pt-12">
      <h1>
        Text to <span>Speech Converter</span>
      </h1>
      <textarea
        placeholder="Write anything here ..."
        value={inputText}
        onChange={handleTextChange}
      ></textarea>
      <div className="row">
        <select
          value={selectedVoice}
          onChange={handleVoiceChange}
          className="block select-language appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-500"
        >
          {/* {voices.map((voice, i) => (
            <option key={i} value={i} className="text-gray-800">
              {voice.name}
            </option>
          ))} */}
        </select>

        <button className="button" onClick={handleButtonClick}>
          Listen & Download
        </button>
      </div>
    </div>
  );
};

export default TextToVoice;
