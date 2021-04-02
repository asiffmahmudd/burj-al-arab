import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);

export const signIn = () =>{

    var provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
        var user = result.user;
        return user;
    }).catch((error) => {
        console.log(error.message);
    });
}

export const signOut = () =>{
    return firebase.auth().signOut().then(() => {
        return true;
      }).catch((error) => {
        
      });
}
