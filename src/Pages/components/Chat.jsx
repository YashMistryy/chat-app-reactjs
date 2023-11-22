import React, { useContext } from "react";
import Cam from "../../img/cam.png";
import Add from "../../img/add.png";
import More from "../../img/more.png";
import Messages from "./Messages";
import Inputbar from "./Inputbar";
import { ChatContext } from "../../context/ChatContext";

// const chat = () => {
//   const { data } = useContext(ChatContext);
//   console.log({ "chatcontext data in CHAT": data.user.displayName });

//   let content = null;
//   if (data.user.displayName) {
//     content = (
//       <div className="chat">
//         <div className="chatInfo">
//           <span>{data.user.displayName}</span>
//           <div className="chatIcons">
//             <img src={Cam} alt="" />
//             <img src={Add} alt="" />
//             <img src={More} alt="" />
//           </div>
//         </div>
//         {/* here will lie all the messages hence a messages component */}
//         <Messages/>
//         {/* below lies the input for writing chats */}
//         <Inputbar />
//       </div>
//     );
//   } else {
//     content = (
//       <div className="chat">
//         <h1 className="messagesDefault">
//           Select a Chat to Start a conversation
//         </h1>
//       </div>
//     );
//   }

//   return <div>{content}</div>;
// };

// export default chat;

// import React, { useContext } from "react";
// import Cam from "../img/cam.png";
// import Add from "../img/add.png";
// import More from "../img/more.png";
// import Messages from "./Messages";
// import Inputbar from "./Inputbar";
// import { ChatContext } from "../context/ChatContext";
// import Inputbar from "./Inputbar";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Inputbar/>
    </div>
  );
};

export default Chat;
