import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
}

export const signIn = () =>{

    var provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
        var user = result.user;
        saveToken();
        return user;
    }).catch((error) => {
        alert(error.message);
    });
}

export const signOut = () =>{
    return firebase.auth().signOut().then(() => {
        return true;
      }).catch((error) => {
        alert(error.message);
      });
}

export const saveToken = () => {
    firebase.auth().currentUser.getIdToken(true)
    .then(function(idToken) {
        sessionStorage.setItem('token', idToken);
    }).catch(function(error) {
        alert(error.message);
    });
}