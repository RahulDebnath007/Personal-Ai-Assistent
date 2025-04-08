import React,{useContext} from 'react'
import './App.css'
import va from "./assets/Veda.png";
import { FaMicrophone } from "react-icons/fa";
import { datacontext } from './context/UserContext';
import speakimg from "./assets/speak.gif";
import aigif from "./assets/aiVoice.gif";
function App() {

  let {recognition,speaking,setSpeaking,prompt,response,setPrompt,setResponse}= useContext(datacontext)
  
  return (
    <div className='main'>
      <img src={va} alt="" id="veda" />
      <span>I'm Veda...Your Advance Virtual Assistant</span>
      
      {!speaking?
      <button onClick={()=>{
       setPrompt("listening...")
       setSpeaking(true)
        setResponse(false)
       recognition.start()
       
       // speak("Hello, I am Veda, your advanced virtual assistant. How can I assist you today?")
      }}>Click here <FaMicrophone /></button>
    
      :
      <div className='response'>
          {response?
            <img src={aigif} alt="" id="aigif"/>
        :
       
        <img src={speakimg} alt="" id="speak"/>
       }
        <p>{prompt}</p>
        </div>
        
        }
    </div>
  )
}

export default App