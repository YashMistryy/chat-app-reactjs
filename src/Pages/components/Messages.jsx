import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../../context/ChatContext";
import Message from "./Message";

import React, { useContext, useEffect, useState } from 'react'
import { db } from "../../firebase";

const Messages = () => {
  // the data provides the info about other selected user (for showing user's chat with him)
  const { data } = useContext(ChatContext);
  const [messages,setMessages] = useState([])
  // console.log({'messagessss':messages});
  useEffect(()=>{
    // create a method which will listen to firestore->chats to see if any new chats appear in database
    const unsub = onSnapshot(doc(db,'chats',data.chatId),(doc)=>{
      // this method is called when the unsub method encounter new messages in databsae
      // console.log({"messagesssss":doc.data().messages});
      doc.exists()&&setMessages(doc.data().messages)
    })

    return ()=>{unsub()}
  },[data.chatId])
  
  console.log(messages);
  return (
    <div className="messages">
      {/* {messages.map((m)=>{   
        <Message msg={m} key={m.id}/>
      })} */}
      {messages.map((m)=><Message message={m} id={m.id} />)}
    </div>
  )
}

export default Messages