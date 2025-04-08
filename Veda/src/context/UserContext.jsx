import React, { createContext ,useState } from 'react'
import run from '../gemini.js';
export const datacontext = createContext()
function UserContext({children}) {
  
    let[speaking,setSpeaking]=useState(false)
    let[prompt,setPrompt]=useState("listening...")
    let[response,setResponse]=useState(false)


    function speak(text){

        let text_speak=new SpeechSynthesisUtterance(text)
        text_speak.lang="hi-IN";
        text_speak.rate=1;
        text_speak.pitch=1;
        text_speak.volume=1;
        window.speechSynthesis.speak(text_speak)
    }
  
   async function aiResponse(prompt){
          let text= await run (prompt)
          let newText = text
          .replace(/google/gi, "Rahul Debnath") // Replace all case-insensitive "google"
          .replace(/\*{1,4}/g, "");             // Remove *, **, ****
        
        // Now set it
        setPrompt(newText);
        
          speak(newText)
          setResponse(true)
          setTimeout(() => {
            setSpeaking(false)
          },15000)
            
          
    }

    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new speechRecognition()
    recognition.onresult=(e)=> {
      let currentIndex = e.resultIndex;
      let transcript = e.results[currentIndex][0].transcript;
       setPrompt(transcript)
       takeCommand(transcript.toLowerCase())

        
    }

    function takeCommand(command){
        if(command.includes("open")&&command.includes("youtube")){
            window.open("https://www.youtube.com/","_blank")
            speak("Opening Youtube")
            setResponse(true)
            setPrompt("Opening Youtube")
            setTimeout(() => {
                setSpeaking(false)
              },5000)
        }
        else if(command.includes("open")&&command.includes("google")){
            window.open("https://www.google.com/","_blank")
            speak("Opening Google")
            setResponse(true)
            setPrompt("Opening Google")
            setTimeout(() => {
                setSpeaking(false)
              },5000)
        }

        //search function
        else if (command.startsWith("search")) {
            const query = command.replace("search", "").trim();
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
            speak(`Searching Google for ${query}`);
            setResponse(true)
            setPrompt(`🔎 Searching: ${query}`);
            setTimeout(() => setSpeaking(false), 5000);
          }
          
        else if(command.includes("open")&&command.includes("whatsapp")){
            window.open("https://web.whatsapp.com/","_blank")
            speak("Opening Whatsapp")
            setResponse(true)
            setPrompt("Opening Whatsapp")
            setTimeout(() => {
                setSpeaking(false)
              },5000)
        }
        else if(command.includes("open")&&command.includes("facebook")){
            window.open("https://www.facebook.com/","_blank")
            speak("Opening Facebook")
            setResponse(true)
            setPrompt("Opening Facebook")
            setTimeout(() => {
                setSpeaking(false)
              },5000)
        }
        else if(command.includes("open")&&command.includes("instagram")){
            window.open("https://www.instagram.com/","_blank")
            speak("Opening Instagram")
            setResponse(true)
            setPrompt("Opening Instagram")
            setTimeout(() => {
                setSpeaking(false)
              },5000)
        }
        else if (
            (command.includes("what") && command.includes("time")) ||
            command.includes("time")
          ) {
            const now = new Date();
            const time = now.toLocaleTimeString('hi-IN', {
              hour: '2-digit',
              minute: '2-digit',
              
            });
          
            speak(`The current time is ${time}`);
            setPrompt(`🕒 ${time}`);
            setResponse(true)
            setTimeout(() => {
              setSpeaking(false);
            }, 8000);
          }
          
          else if (
            (command.includes("what") && command.includes("date")) ||
            command.includes("date")
          ) {
            const now = new Date();
            const date = now.toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
          
            speak(`Today's date is ${date}`);
            setPrompt(`📅 ${date}`);
            setResponse(true)
            setTimeout(() => {
              setSpeaking(false);
            }, 8000);
          }
        else if(command.includes("open")&&command.includes("gmail")){
            window.open("https://mail.google.com/","_blank")
            speak("Opening Gmail")
            setResponse(true)
            setPrompt("Opening Gmail")
            setTimeout(() => {
                setSpeaking(false)
              },5000)          
            }

            //weather
            else if (command.includes("weather")) {
                const triggerPhrases = ["weather in", "weather at", "weather for"];
                let city = "";
              
                for (let phrase of triggerPhrases) {
                  if (command.includes(phrase)) {
                    city = command.split(phrase)[1]?.trim();
                    break;
                  }
                }
              
                if (city && city.length > 0) {
                  const url = `https://www.google.com/search?q=weather+in+${encodeURIComponent(city)}`;
                  window.open(url, "_blank");
                  speak(`Showing weather for ${city}`);
                  setPrompt(`🌤️ Weather in ${city}`);
                } else {
                  speak("I didn't catch the city name. Please say something like 'weather in Mumbai'");
                  setPrompt("❗ City not detected");
                }
                setResponse(true)
                setTimeout(() => setSpeaking(false), 5000);
              }
              
              else if (command.includes("open game")) {
                window.open("https://www.crazygames.com/", "_blank");
                speak("Opening some fun games for you!");
                setPrompt("🎮 Let's play!");
              }
                  
                  else if (command.includes("open music")) {
                 window.open("https://www.spotify.com/", "_blank");
                 speak("Opening some music for you!");
                 setPrompt("🎶 Let's listen to some tunes!");
                 setResponse(true)
                 setTimeout(() => {
                    setSpeaking(false)
                  },5000) 
                  }
                  
                  else if (command.includes("open news")) {
                 window.open("https://news.google.com/", "_blank");
                 speak("Opening the latest news for you!");
                 setPrompt("📰 Let's catch up on the news!");
                    setResponse(true)
                 setTimeout(() => {
                    setSpeaking(false)
                  },5000) 
                  }              
              
              
        else{
            aiResponse(command)
            
        }
    }




    let value = {
        recognition,
        speaking,
        setSpeaking,
        prompt,
        setPrompt,
        response,
        setResponse
        
  }
    return (
    <div>
        <datacontext.Provider value={value}>
        {children}
        </datacontext.Provider>
    </div>
  )
}

export default UserContext