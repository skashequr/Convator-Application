import { useState, useEffect } from "react";
import "./TexttoVoice.css";
import Swal from "sweetalert2";
import useUserConvertLimit from "../../Hooks/useUserConvertLimit";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Helpdesk from "../../Component/Shared/Helpdesk";
import { Card, Dropdown } from "flowbite-react";

const TextToVoice = () => {
  const [speech, setSpeech] = useState(new SpeechSynthesisUtterance());
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [inputText, setInputText] = useState("");
  const axiosPublic = useAxiosPublic();
  const {
    currentUserConvertLimit,
    matchPaidStatus,
    updateValue,
    reload,
    user,
  } = useUserConvertLimit();
  // --------------text download------------
  const handleDownloadText = () => {
    const blob = new Blob([inputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "input_text.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
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
    <div className="hero p-3 bg-AllCard pt-32">
      <Card className="shadow-lg">
        <h1>
          Text to <span>Speech Converter</span>
        </h1>
        <textarea
          placeholder="Write anything here ..."
          value={inputText}
          onChange={handleTextChange}
        ></textarea>
        <Card>
          <div className="row justify-between">
            <Dropdown
              label="Select Voice"
              size="sm"
              type="primary"
              dismissOnClick={false}
            >
              {voices.map((voice, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => handleVoiceChange(index)}
                >
                  {voice.name}
                </Dropdown.Item>
              ))}
            </Dropdown>

            <button className="button" onClick={handleButtonClick}>
              Listen & Download
            </button>
          </div>
        </Card>
        <div className="flex justify-between gap-3">
          <button className="button" onClick={handleDownloadText}>
            Download Text
          </button>

          <Helpdesk></Helpdesk>
        </div>
      </Card>
    </div>
  );
};

export default TextToVoice;
