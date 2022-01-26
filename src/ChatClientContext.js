import { createContext, useState } from "react";
import { StreamChat } from "stream-chat";

const key = process.env.REACT_APP_STREAM_API_KEY;

export const ChatClientContext = createContext();

export const ChatClientProvider = (props) => {

  const [chatClient] = useState(StreamChat.getInstance(key));
  // console.log('API KEY', key)
  console.log('CHAT CLIENT', chatClient)

  return (
    <ChatClientContext.Provider value={chatClient}>
      {props.children}
    </ChatClientContext.Provider>
  )
}
