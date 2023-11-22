// import React, { useState } from "react";
// import AddAvatatar from "../img/addAvatar.png";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth ,storage ,db } from "../firebase";
// import { doc, setDoc } from "firebase/firestore"; 
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import {
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";

// const Register = () => {
//   const [error, setError] = useState("");
//   const navigate = useNavigate()
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     // console.log(e.target[0].value);
//     // we are going to authenticate using email and password
//     const displayName = e.target[0].value;
//     const email = e.target[1].value;
//     const password = e.target[2].value;
//     const file = e.target[3].files[0];

//     try {
//       const res = await createUserWithEmailAndPassword(auth, email, password);

//       // const storage = getStorage();
//       const storageRef = ref(storage, displayName);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       // Register three observers:
//       // 1. 'state_changed' observer, called any time the state changes
//       // 2. Error observer, called on failure
//       // 3. Completion observer, called on successful completion
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           // Observe state change events such as progress, pause, and resume
//           // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log("Upload is " + progress + "% done");
//           switch (snapshot.state) {
//             case "paused":
//               console.log("Upload is paused");
//               break;
//             case "running":
//               console.log("Upload is running");
//               break;
//           }
//         },
//         (error) => {
//           // Handle unsuccessful uploads
//         },
//         () => {
//           // Handle successful uploads on complete
//           // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//             console.log("File available at", downloadURL);
//             await updateProfile(res.user,{
//               displayName,
//               photoURL:downloadURL,
//             })
//             await setDoc(doc(db, "users", res.user.uid), {
//               uid : res.user.uid,
//               displayName,
//               email,
//               photoURL:downloadURL
//             })
//             await setDoc(doc(db, "userChats", res.user.uid), {});
//             navigate("/");
//           });
//         }
//       );
//     } catch (error) {
//       console.log(String(error));
//       setError(String(error));
//     }
//   };
//   return (
//     <div className="formContainer">
//       <div className="formWrapper">
//         <span className="logo">Dees Chat</span>
//         <span className="title">Register</span>
//         <form onSubmit={handleFormSubmit}>
//           <input type="text" placeholder="display name" />
//           <input type="email" placeholder="email" />
//           <input type="password" placeholder="password" />
//           <input
//             style={{ display: "none" }}
//             id="file-input"
//             type="file"
//             className="email"
//             placeholder="your avatar!"
//           />
//           <label htmlFor="file-input">
//             <img src={AddAvatatar} alt="img-not-loaded" />
//             <span>Add An Avatar!</span>
//           </label>
//           <button className="btn-sign-up">Sign up</button>
//           {error.length > 0 && (
//             <span style={{ color: "red", maxWidth: "50%" }}>
//               An error occured! {error}
//             </span>
//           )}
//         </form>

//         <p>Already have an account? <Link to="/login">Login</Link></p>
//       </div>
//     </div>
//   );
// };

// export default Register;
import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
            
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/register">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
