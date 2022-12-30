
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";

//Aloha


const firebaseConfig = {
  apiKey: "AIzaSyCnFk3A5OwPlIiC-53rvYlqSafMFDy_CK4",
  authDomain: "social-media-app-1c423.firebaseapp.com",
  projectId: "social-media-app-1c423",
  storageBucket: "social-media-app-1c423.appspot.com",
  messagingSenderId: "669052685142",
  appId: "1:669052685142:web:5d8426bd73e590142ce4f7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);