import React, { useContext, useEffect ,useRef } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Message = ({message}) => {
  console.log(message);
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const ref = useRef();
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:
      "smooth"});
  },[message]);
  
  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid
      ? "owner"
      : "not-owner"}`}>
      <div className="messageInfo">
        {/* it will contain an image (round) with the time of the message recieved */}
        <img src={
              message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL}/>
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        <img src=''/>
      </div>
    </div>
  )
}

export default Message