import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from "@chatscope/chat-ui-kit-react"
import axios from 'axios';

function App() {

  // const [messages, setMessages] = useState([
  //   {
  //     message: "Hey chat",
  //     sender: "chatbot",
  //     direction: "incoming"
  //   }
  // ])

  const [messages, setMessages] = useState([])

  const endpoint = `${import.meta.env.VITE_API_URL}bots/`;

  const fetchData = async() => {
    console.log('fetching')
    const response = await axios.get(endpoint)
    // console.log(response)
    const {data} = response
    // console.log(data)

    let serverMessages = data.map((messageObject) => {
        let dir = "";
        if (messageObject.sender === "chatbot") {
          dir = "incoming";
        } else {
          dir = "outgoing";
        }
        return {message: messageObject.text, sender: messageObject.sender, direction:dir}
      });

      // console.log(serverMessages)
      setMessages(serverMessages)
  }

  useEffect(()=>{
    fetchData()
  },[])


  
  const [typing, setTyping] = useState(false);

  
  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    }
    // const newMessages = [...messages, newMessage];
    // setMessages(newMessages);
    setMessages(messages => [...messages, newMessage]);
    setTyping(true);
    const responseMessage = await postMessageToServer(newMessage);
    console.log(responseMessage);
    // const responseMessages = [...messages, responseMessage];
    // setMessages(responseMessages)
    setMessages(messages => [...messages, responseMessage]);
    setTyping(false);

    // await processMessageToChatbot(newMessages);
  }

  async function postMessageToServer(chatMessage) {
    const serverMessage = {sender:chatMessage.sender, text: chatMessage.message}
    const response = await axios.post(endpoint, serverMessage)
    const {data} = response
    // console.log(response)
    return {message: data.text, sender: data.sender, direction:'incoming'};
  }

  // async function processMessageToChatbot(chatMessages) {

    // For openAI chatbot
    // let apiMessages = chatMessages.map((messageObject) => {
    //   let role = "";
    //   if (messageObject.sender === "chatbot") {
    //     role = "bot";
    //   } else {
    //     role = "user";
    //   }
    //   return {role: role, content: messageObject.message}
    // });

    // const apiRequestBody = {
    //   "model": "gpt-3.5-turbo",
    //   "messages": [
    //     systemMessage,  // The system message DEFINES the logic of our chatGPT
    //     ...apiMessages // The messages from our chat with ChatGPT
    //   ]
    // }
    // await fetch("https://api.openai.com/v1/chat/completions", 
    // {
    //   method: "POST",
    //   headers: {
    //     "Authorization": "Bearer " + API_KEY,
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(apiRequestBody)
    // }).then((data) => {
    //   return data.json();
    // }).then((data) => {
    //   console.log(data);
    //   setMessages([...chatMessages, {
    //     message: data.choices[0].message.content,
    //     sender: "ChatGPT"
    //   }]);
    // });
    
    // Testing with dummy response
    // let response = "My response to " + chatMessages.slice(-1)[0].message
    // console.log(response);
    // setMessages([...chatMessages, {
    //   message: response,
    //   sender: "chatbot",
    //   direction: "incoming"
    // }]);
    //
    // setTyping(false);
  // }
  
  // useEffect(()=>{
  //   async function fetchData() {
  //     console.log(import.meta.env.VITE_API_URL)
  //     try{
  //       let api_url = `${import.meta.env.VITE_API_URL}bots`;
  //       console.log(api_url);
  //       const response = await fetch(`${import.meta.env.VITE_API_URL}bots`);
  //       if (!response.ok) {
  //         throw new Error("Response not ok");
  //       }
  //       const result = await response.json();
  //       console.log(result);

  //       // setMessages([...chatMessages, {
  //       //   message: response,
  //       //   sender: "chatbot",
  //       //   direction: "incoming"
  //       // }]);
  //     } catch (error) {
  //       console.error("Error fetching:", error)
  //     }
  //   }
  //   fetchData();
  // }, []);
  

  return (
    <>
      <div>
        <div style={{ position: "relative", height: "800px", width:"700px"}}>
          <MainContainer>
            <ChatContainer>
              <MessageList
                typingIndicator={typing ? <TypingIndicator content="Chatbot is thinking"/> : null}
              >
                {messages.map((message, i) => {
                  return <Message key={i} model={message} />
                })}
              </MessageList>
              <MessageInput placeholder='Type here' onSend={handleSend} />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </>
  )
}

export default App
