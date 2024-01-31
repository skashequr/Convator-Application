import { useState, useEffect } from "react";
import "./TexttoVoice.css";

const TextToVoice = () => {
  const [speech, setSpeech] = useState(new SpeechSynthesisUtterance());
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [inputText, setInputText] = useState("");

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

  const handleButtonClick = () => {
    speech.text = inputText;
    window.speechSynthesis.speak(speech);
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
        <select value={selectedVoice} onChange={handleVoiceChange}>
          {voices.map((voice, i) => (
            <option key={i} value={i}>
              {voice.name}
            </option>
          ))}
        </select>
        <button className="button" onClick={handleButtonClick}>
          <img src="./icons8-play-48.png" alt="" /> Listen
        </button>
      </div>
    </div>
  );
};

export default TextToVoice;
