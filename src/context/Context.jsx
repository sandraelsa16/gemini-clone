import { createContext, useState } from "react"; 
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState(""); //save the input data
  const [recentPrompt, setRecentPrompt] = useState(""); // when the send button is clicked the input is stored in recentPrompt and display it
  const [prevPrompts, setPrevPrompts] = useState([]); // to store all i/p history and display it
  const [showResult, setshowResult] = useState(false); // if true hides the boxes and display the result
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(""); //to display the result on webpage

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };


   const newChat = ()=>{
    setLoading(false)
    setshowResult(false)
   }
  const onSent = async (prompt) => {
   

    setResultData("");
    setLoading(true);
    setshowResult(true);
    let response = ""
    if(prompt !== undefined){
response = await runChat(prompt)
setRecentPrompt(prompt)
    }else {
        setPrevPrompts(prev =>[...prev,input])
        setRecentPrompt(input)
        response = await runChat(input)
    }
 
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    console.log("Gemini API Response Text:", response);

    const newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    setLoading(false);
    setInput("");
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
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
