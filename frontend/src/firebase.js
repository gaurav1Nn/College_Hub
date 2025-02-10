// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.API_KEY}`,
  authDomain: "collegehub-96bbf.firebaseapp.com",
  projectId:`${process.env.PROJECT_ID}` ,
  storageBucket: "collegehub-96bbf.appspot.com",
  messagingSenderId: `${process.env.MESSAGE_SENDER_ID}`,
  appId: `${process.env.APP_ID}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;