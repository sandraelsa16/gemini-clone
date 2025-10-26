import { createContext, useState } from "react"; // 1. ADD useState
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

  const [input, setInput] = useState(""); //save the input data
  const [recentPrompt,setRecentPrompt] = useState(""); // when the send button is clicked the input is stored in recentPrompt and display it
  const [prevPrompts,setPrevPrompts] = useState([]) // to store all i/p history and display it
  const [showResult,setshowResult] = useState(false) // if true hides the boxes and display the result
  const [loading,setLoading] = useState(false)
  const [resultData,setResultData] = useState("") //to display the result on webpage

  const onSent = async () => {
    // 3. Store the response and update state
    
    setResultData("")
    setLoading(true)
    setshowResult(true)
    setRecentPrompt(input)
    const response = await runChat(input);
   console.log("Gemini API Response Text:", response);
     setResultData(response)
     setLoading(false)
     setInput("")

  };

  
  const contextValue = {
    onSent, 
    prevPrompts,
    setPrevPrompts,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput
    

  };

  return (
    <Context.Provider value={contextValue}>
      {props.children} 
    </Context.Provider>
  );
};

export default ContextProvider;
