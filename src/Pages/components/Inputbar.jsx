import React, { useContext, useState } from "react";
import Img from "../../img/img.png";
import Attach from "../../img/attach.png";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { uploadBytesResumable } from "firebase/storage";
const Inputbar = () => {
  const [inputText, setInputText] = useState("");
  const [inputImg, setInputImg] = useState(null);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  
  const handleSend = async (e) => {
    // sending the image or text to the firestore for this particular chatId
    debugger
    if (inputImg) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, inputImg);
      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(
              doc(db, "chats", data.chatId, {
                messages: arrayUnion({
                  // here lies the details of a message sent like user id and all needed field
                  // also adding the field for image
                  id: uuid(),
                  img: downloadURL,
                  text: inputText,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                }),
              })
            );
          });
        }
      );
    } else {
      // sending the text msg!
      // actually we are adding this message to the messages array of char Ref
      await updateDoc(
        doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            // here lies the details of a message sent like user id and all needed field
            id: uuid(),
            text: inputText,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      
      setInputText("");
      setInputImg(null);
    }
  };
  return (
    <div className="inputbar">
      <input
        type="text"
        placeholder="Enter some text."
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
      />
      <div className="send">
        {/* this div contains button to send alongside some imgbuttons like attach , images , etc */}
        <img src={Img} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="fileInput"
          onChange={(e) => {
            setInputImg(e.target.files[0]);
          }}
        />
        <label htmlFor="fileInput">
          <img src={Attach} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Inputbar;
