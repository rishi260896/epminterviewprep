import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCBFbr284vlcrjR1-6wsNhl5xDtPApn0s",
  authDomain: "empinterviewprep.firebaseapp.com",
  projectId: "empinterviewprep",
  storageBucket: "empinterviewprep.appspot.com",
  messagingSenderId: "718754178051",
  appId: "1:718754178051:web:92af2c883e9e24d351da36",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
