import React, {
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";

import run from "../gemini.js";

export const datacontext = createContext();

function UserContext({ children }) {

  const [listening, setListening] = useState(false);

  const [prompt, setPrompt] = useState(
    "Click the microphone and speak..."
  );

  const [response, setResponse] = useState(false);

  const recognitionRef = useRef(null);

  const responseTimerRef = useRef(null);

  /*
  ============================================================
  SPEECH SYNTHESIS
  ============================================================
  */

  function speak(text) {

    if (!text) {
      return;
    }

    window.speechSynthesis.cancel();

    const textSpeak =
      new SpeechSynthesisUtterance(text);

    textSpeak.lang = "en-IN";
    textSpeak.rate = 1;
    textSpeak.pitch = 1;
    textSpeak.volume = 1;

    window.speechSynthesis.speak(
      textSpeak
    );
  }


  /*
  ============================================================
  STOP RESPONSE STATE
  ============================================================
  */

  function finishResponse(delay = 5000) {

    if (responseTimerRef.current) {
      clearTimeout(
        responseTimerRef.current
      );
    }

    responseTimerRef.current =
      setTimeout(() => {

        setResponse(false);

        setPrompt(
          "Click the microphone and speak..."
        );

      }, delay);
  }


  /*
  ============================================================
  AI RESPONSE
  ============================================================
  */

  async function aiResponse(userPrompt) {

    try {

      setResponse(true);

      setPrompt(
        "Thinking..."
      );

      const text =
        await run(userPrompt);

      if (!text) {

        throw new Error(
          "Gemini returned an empty response."
        );

      }

      const newText =
        text
          .replace(/google/gi, "Rahul Debnath")
          .replace(/\*{1,4}/g, "")
          .trim();

      setPrompt(newText);

      speak(newText);

      finishResponse(15000);

    } catch (error) {

      console.error(
        "Gemini error:",
        error
      );

      setResponse(true);

      setPrompt(
        "Sorry, I could not connect to Gemini."
      );

      speak(
        "Sorry, I could not connect to Gemini."
      );

      finishResponse(7000);
    }
  }


  /*
  ============================================================
  COMMAND HANDLER
  ============================================================
  */

  async function takeCommand(command) {

    const cleanCommand =
      command
        .toLowerCase()
        .trim();


    /*
    ------------------------------------------------------------
    YOUTUBE
    ------------------------------------------------------------
    */

    if (
      cleanCommand.includes("open") &&
      cleanCommand.includes("youtube")
    ) {

      window.open(
        "https://www.youtube.com/",
        "_blank"
      );

      speak(
        "Opening YouTube"
      );

      setResponse(true);

      setPrompt(
        "Opening YouTube"
      );

      finishResponse();

      return;
    }


    /*
    ------------------------------------------------------------
    GOOGLE
    ------------------------------------------------------------
    */

    if (
      cleanCommand.includes("open") &&
      cleanCommand.includes("google")
    ) {

      window.open(
        "https://www.google.com/",
        "_blank"
      );

      speak(
        "Opening Google"
      );

      setResponse(true);

      setPrompt(
        "Opening Google"
      );

      finishResponse();

      return;
    }


    /*
    ------------------------------------------------------------
    GOOGLE SEARCH
    ------------------------------------------------------------
    */

    if (
      cleanCommand.startsWith("search")
    ) {

      const query =
        cleanCommand
          .replace("search", "")
          .trim();

      if (!query) {

        speak(
          "What would you like me to search for?"
        );

        setPrompt(
          "Please provide a search query."
        );

        setResponse(true);

        finishResponse();

        return;
      }

      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(
          query
        )}`,
        "_blank"
      );

      speak(
        `Searching Google for ${query}`
      );

      setResponse(true);

      setPrompt(
        `🔎 Searching: ${query}`
      );

      finishResponse();

      return;
    }


    /*
    ------------------------------------------------------------
    WHATSAPP
    ------------------------------------------------------------
    */

    if (
      cleanCommand.includes("open") &&
      cleanCommand.includes("whatsapp")
    ) {

      window.open(
        "https://web.whatsapp.com/",
        "_blank"
      );

      speak(
        "Opening WhatsApp"
      );

      setResponse(true);

      setPrompt(
        "Opening WhatsApp"
      );

      finishResponse();

      return;
    }


    /*
    ------------------------------------------------------------
    FACEBOOK
    ------------------------------------------------------------
    */

    if (
      cleanCommand.includes("open") &&
      cleanCommand.includes("facebook")
    ) {

      window.open(
        "https://www.facebook.com/",
        "_blank"
      );

      speak(
        "Opening Facebook"
      );

      setResponse(true);

      setPrompt(
        "Opening Facebook"
      );

      finishResponse();

      return;
    }


    /*
    ------------------------------------------------------------
    INSTAGRAM
    ------------------------------------------------------------
    */

    if (
      cleanCommand.includes("open") &&
      cleanCommand.includes("instagram")
    ) {

      window.open(
        "https://www.instagram.com/",
        "_blank"
      );

      speak(
        "Opening Instagram"
      );

      setResponse(true);

      setPrompt(
        "Opening Instagram"
      );

      finishResponse();

      return;
    }


    /*
    ------------------------------------------------------------
    GMAIL
    ------------------------------------------------------------
    */

    if (
      cleanCommand.includes("open") &&
      cleanCommand.includes("gmail")
    ) {

      window.open(
        "https://mail.google.com/",
        "_blank"
      );

      speak(
        "Opening Gmail"
      );

      setResponse(true);

      setPrompt(
        "Opening Gmail"
      );

      finishResponse();

      return;
    }


    /*
    ------------------------------------------------------------
    WEATHER
    ------------------------------------------------------------
    */

    if (
      cleanCommand.includes("weather")
    ) {

      const triggerPhrases = [
        "weather in",
        "weather at",
        "weather for",
      ];

      let city = "";

      for (
        const phrase of triggerPhrases
      ) {

        if (
          cleanCommand.includes(phrase)
        ) {

          city =
            cleanCommand
              .split(phrase)[1]
              ?.trim();

          break;
        }
      }


      if (city) {

        const url =
          `https://www.google.com/search?q=weather+in+${encodeURIComponent(
            city
          )}`;

        window.open(
          url,
          "_blank"
        );

        speak(
          `Showing weather for ${city}`
        );

        setPrompt(
          `🌤️ Weather in ${city}`
        );

      } else {

        speak(
          "I didn't catch the city name."
        );

        setPrompt(
          "❗ City not detected"
        );
      }

      setResponse(true);

      finishResponse();

      return;
    }


    /*
    ------------------------------------------------------------
    GAMES
    ------------------------------------------------------------
    */

    if (
      cleanCommand.includes("open game")
    ) {

      window.open(
        "https://www.crazygames.com/",
        "_blank"
      );

      speak(
        "Opening some fun games for you."
      );

      setPrompt(
        "🎮 Let's play!"
      );

      setResponse(true);

      finishResponse();

      return;
    }


    /*
    ------------------------------------------------------------
    MUSIC
    ------------------------------------------------------------
    */

    if (
      cleanCommand.includes("open music")
    ) {

      window.open(
        "https://www.spotify.com/",
        "_blank"
      );

      speak(
        "Opening Spotify."
      );

      setPrompt(
        "🎶 Let's listen to some tunes!"
      );

      setResponse(true);

      finishResponse();

      return;
    }


    /*
    ------------------------------------------------------------
    NEWS
    ------------------------------------------------------------
    */

    if (
      cleanCommand.includes("open news")
    ) {

      window.open(
        "https://news.google.com/",
        "_blank"
      );

      speak(
        "Opening the latest news."
      );

      setPrompt(
        "📰 Latest news"
      );

      setResponse(true);

      finishResponse();

      return;
    }


    /*
    ------------------------------------------------------------
    TIME
    ------------------------------------------------------------
    */

    if (
      cleanCommand.includes("time")
    ) {

      const now =
        new Date();

      const time =
        now.toLocaleTimeString(
          "en-IN",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        );

      speak(
        `The current time is ${time}`
      );

      setPrompt(
        `🕒 ${time}`
      );

      setResponse(true);

      finishResponse(8000);

      return;
    }


    /*
    ------------------------------------------------------------
    DATE
    ------------------------------------------------------------
    */

    if (
      cleanCommand.includes("date")
    ) {

      const now =
        new Date();

      const date =
        now.toLocaleDateString(
          "en-IN",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );

      speak(
        `Today's date is ${date}`
      );

      setPrompt(
        `📅 ${date}`
      );

      setResponse(true);

      finishResponse(8000);

      return;
    }


    /*
    ------------------------------------------------------------
    GEMINI
    ------------------------------------------------------------
    */

    await aiResponse(
      cleanCommand
    );
  }


  /*
  ============================================================
  CREATE SPEECH RECOGNITION ONCE
  ============================================================
  */

  useEffect(() => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

      console.error(
        "Speech Recognition is not supported by this browser."
      );

      setPrompt(
        "Speech recognition is not supported in this browser."
      );

      return;
    }


    const recognition =
      new SpeechRecognition();


    recognition.continuous =
      false;

    recognition.interimResults =
      false;

    recognition.lang =
      "en-IN";


    /*
    ------------------------------------------------------------
    RESULT
    ------------------------------------------------------------
    */

    recognition.onresult =
      async (event) => {

        const currentIndex =
          event.resultIndex;

        const transcript =
          event
            .results[currentIndex][0]
            .transcript
            .trim();


        console.log(
          "Speech:",
          transcript
        );


        if (!transcript) {

          setPrompt(
            "I didn't hear anything."
          );

          setListening(false);

          return;
        }


        setPrompt(
          transcript
        );

        setListening(false);

        await takeCommand(
          transcript
        );
      };


    /*
    ------------------------------------------------------------
    START
    ------------------------------------------------------------
    */

    recognition.onstart =
      () => {

        console.log(
          "Veda microphone started."
        );

        setListening(true);

        setResponse(false);

        setPrompt(
          "Listening..."
        );
      };


    /*
    ------------------------------------------------------------
    END
    ------------------------------------------------------------
    */

    recognition.onend =
      () => {

        console.log(
          "Veda microphone stopped."
        );

        setListening(false);
      };


    /*
    ------------------------------------------------------------
    ERROR
    ------------------------------------------------------------
    */

    recognition.onerror =
      (event) => {

        console.error(
          "Speech recognition error:",
          event.error
        );

        setListening(false);


        if (
          event.error ===
          "not-allowed"
        ) {

          setPrompt(
            "Microphone permission was denied."
          );

          return;
        }


        if (
          event.error ===
          "no-speech"
        ) {

          setPrompt(
            "I didn't hear anything. Try again."
          );

          return;
        }


        setPrompt(
          `Microphone error: ${event.error}`
        );
      };


    recognitionRef.current =
      recognition;


    /*
    ------------------------------------------------------------
    CLEANUP
    ------------------------------------------------------------
    */

    return () => {

      try {

        recognition.stop();

      } catch {}

      recognitionRef.current =
        null;

    };

  }, []);


  /*
  ============================================================
  START LISTENING
  ============================================================
  */

  function startListening() {

    const recognition =
      recognitionRef.current;


    if (!recognition) {

      setPrompt(
        "Speech recognition is not available."
      );

      return;
    }


    if (listening) {
      return;
    }


    window.speechSynthesis.cancel();


    try {

      recognition.start();

    } catch (error) {

      console.warn(
        "Recognition start failed:",
        error
      );

      /*
      Chrome can throw InvalidStateError
      if start() is called twice.
      */

      if (
        error.name ===
        "InvalidStateError"
      ) {

        try {
          recognition.stop();
        } catch {}

        setTimeout(() => {

          try {
            recognition.start();
          } catch {}

        }, 200);

      }
    }
  }


  /*
  ============================================================
  STOP LISTENING
  ============================================================
  */

  function stopListening() {

    const recognition =
      recognitionRef.current;


    if (!recognition) {
      return;
    }


    try {

      recognition.stop();

    } catch {}


    setListening(false);

    setPrompt(
      "Microphone stopped."
    );
  }


  /*
  ============================================================
  CONTEXT VALUE
  ============================================================
  */

  const value = {

    listening,

    response,

    prompt,

    startListening,

    stopListening,

    speak,

    setPrompt,

    setResponse,

  };


  return (
    <datacontext.Provider
      value={value}
    >
      {children}
    </datacontext.Provider>
  );
}

export default UserContext;