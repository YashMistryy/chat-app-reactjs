import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";  
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [err, setErr] = useState(false);
  const [user, setUser] = useState("");
  const {currentUser} = useContext(AuthContext)

  // console.log(currentUser);
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSearch = async () => {
    console.log({username});
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setUser(doc.data());
      });
      console.log(querySnapshot.docs);
      if(querySnapshot.docs.length == 0){setErr(true)}
      else{setErr(false)}
    } catch (err) {
      setErr(true);
    }
  };
  const handleSelect = async()=>{
    // creating combined id which will be our unique id for the chats between this two user
    debugger
    const combinedId = currentUser.uid > user.uid ? currentUser.uid+user.uid :user.uid+currentUser.uid
    try{
      // 
      const res = await getDoc(doc(db,"chats",combinedId))
      // console.log(!res.exists());
      if(!res.exists()){
        // create chats if not present
        console.log("creating chats as not already present!!!");
        await setDoc(doc(db,"chats",combinedId) , {messages:[]});
        // create userChats for both user
        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [combinedId+".userInfo"]:{uid:user.uid,displayName:user.displayName,photoURL:user.photoURL}
        })

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

      }else{
        console.log("logs do exists!@");
      }
    }
    catch(err){
      debugger
      console.log(err);
    }
    setUser(null);
    setUsername("")
  }
  // console.log({err})
  return (
    <div>
      <div className="search">
        <div className="searchForm">
          <input
            type="text"
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="enter a name .."
            value={username}
          />
        </div>

       {user && <div className="userChat" onClick={handleSelect}>
          <img
            src= {user.photoURL}
            width={48}
            height={48}
            alt="img-user"
          />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>}
        {err && <h4 style={{color:'red'}}>user not found!</h4>}

      </div>
    </div>
  );
};

export default Search;
