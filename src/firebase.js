// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDehMlozT5ZCbaCXF7vGfGKF3ktLdMCCfA",
  authDomain: "my-awsm-chat-app.firebaseapp.com",
  projectId: "my-awsm-chat-app",
  storageBucket: "my-awsm-chat-app.appspot.com",
  messagingSenderId: "278926598623",
  appId: "1:278926598623:web:967679a25d78ef8a89646a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
