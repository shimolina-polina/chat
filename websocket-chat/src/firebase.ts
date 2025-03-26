import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYmpqvWovMaz0l0wUoZlIKUhPzehtPPlQ",
  authDomain: "websocket-app-6c24f.firebaseapp.com",
  projectId: "websocket-app-6c24f",
  storageBucket: "websocket-app-6c24f.firebasestorage.app",
  messagingSenderId: "504182807772",
  appId: "1:504182807772:web:25af1721a7686e073ae819"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();