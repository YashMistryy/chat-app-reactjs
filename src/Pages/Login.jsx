import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddAvatatar from "../img/addAvatar.png";
import { Link } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate()
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    // we are going to authenticate using email and password
    // const displayName = e.target[0].value;
    const email = e.target[0].value;
    const password = e.target[1].value;
    // const file = e.target[3].files[0];

    try {
      // authenticate using email and password
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/")
          console.log("USER SIGNED IN SUCCESSFULLY!!!!!!!!!!!!!!");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log("USER DID NOT-----------SIGNED IN SUCCESSFULLY!!!!!!!!!!!!!!");

          const errorMessage = error.message;
        });
    } catch (error) {
      console.log(String(error));
      setError(String(error));
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Dees Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleLoginSubmit}>
          {/* <input type="text" placeholder="display name" /> */}
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
         
          <button className="btn-sign-up">Login</button>
        </form>

        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
