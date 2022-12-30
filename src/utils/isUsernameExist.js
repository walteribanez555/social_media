import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "lib/firebase";

export default function isUsernameExist(username){
    const q = query(collection(db,"users"), where("username", "==", username));
    const querySnapshot =getDocs(q)
    return querySnapshot.size > 0 ;
}