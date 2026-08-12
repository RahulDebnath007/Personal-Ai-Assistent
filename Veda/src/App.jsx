import React, { useContext } from "react";
import "./App.css";
import va from "./assets/Veda.png";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { datacontext } from "./context/UserContext";
import speakimg from "./assets/speak.gif";
import aigif from "./assets/aiVoice.gif";

function App() {
  const {
    listening,
    response,
    prompt,
    startListening,
    stopListening,
  } = useContext(datacontext);

  return (
    <div className="main">

      <img
        src={va}
        alt="Veda"
        id="veda"
      />

      <span>
        I'm Veda...Your Advance Virtual Assistant
      </span>

      {/* Response area */}
      <div className="response">

        {response ? (
          <img
            src={aigif}
            alt="Veda responding"
            id="aigif"
          />
        ) : listening ? (
          <img
            src={speakimg}
            alt="Listening"
            id="speak"
          />
        ) : null}

        <p>
          {prompt}
        </p>

      </div>

      {/* Microphone ALWAYS remains visible */}
      <button
        className={`mic-button ${
          listening ? "listening" : ""
        }`}
        onClick={
          listening
            ? stopListening
            : startListening
        }
      >

        {listening ? (
          <>
            Stop
            <FaStop />
          </>
        ) : (
          <>
            Click here
            <FaMicrophone />
          </>
        )}

      </button>

    </div>
  );
}

export default App;