import React, { useContext, useEffect ,useState} from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import { ChatContext } from "../../context/ChatContext";

const chats = () => {
  // this is the side panel component which shows the users whom with we are connected and have details about them in user's userChats(firestore)
  const { currentUser } = useContext(AuthContext);
  const {data,dispatch} = useContext(ChatContext)
  const [chats, setChats] = useState([]);
  // console.log(currentUser);
  useEffect(() => {
    debugger

    const getChats= ()=>{
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        console.log(doc.data())
        // console.log(Object.entries(doc.data()))
        setChats(doc.data())
      })
      return ()=>{currentUser && unsub()}
    }
    currentUser.uid && getChats()
  }, [currentUser.uid]);

  const handleSelect = (userInfo)=>{
    debugger
    // this function handles the dipatching or changing the other user info so that chat section can access the other user's data
    dispatch({type:"CHANGE_USER",payload:userInfo})
  }
  console.log(chats);
  return (
    <div className="chats">
      {Object.entries(chats).map((c)=>(
        <div className="userChat" id={c[0]} onClick={()=>handleSelect(c[1].userInfo)}>
        <img
          src={c[1].userInfo.photoURL}
          width={48}
          height={48}
          alt="img-user"
          />
        <div className="userChatInfo">
          <span>{c[1].userInfo.displayName}</span>
          <p>{c[1].userInfo.displayName}</p>
        </div>
      </div>
        ) )}
    </div>
  );
};

export default chats;
