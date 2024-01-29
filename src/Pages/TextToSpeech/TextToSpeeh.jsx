import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SpeechToText = () => {
  const [clicked, setClicked] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleClick = () => {
    setClicked(true);
    resetTranscript();
    SpeechRecognition.startListening();
  };

  const handleMouseUp = () => {
    setClicked(false);
    SpeechRecognition.stopListening();
  };

  return (
    <div>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, modi
          aut eveniet praesentium magni iste a impedit nostrum suscipit! Illum
          aperiam quis voluptas esse placeat nesciunt saepe laborum temporibus
          cumque?
        </p>
      </div>
      <button
        className="bg-primary-400"
        onMouseDown={handleClick}
        onMouseUp={handleMouseUp}
      >
        {clicked ? "Listening..." : "Click and Speak"}
      </button>
      {transcript && <p>Transcript: {transcript}</p>}
    </div>
  );
};

export default SpeechToText;
