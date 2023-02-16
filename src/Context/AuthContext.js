import firebase from 'firebase';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [loggedInUser, setLoggedInUser] = useState();
    const [loading, setLoading] = useState(true);

    const formatUser = (user) => ({
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
        uid: user.uid,
    });
    
    const logIn = () =>{
        var provider = new firebase.auth.GoogleAuthProvider();
    
        return auth.signInWithPopup(provider)
        .then((result) => {
            const formattedUser = formatUser(result.user);
            setLoggedInUser(formattedUser);
        }).catch((error) => {
            alert(error.message);
        });
    }

    function logOut(){
        return auth.signOut()
        .then(() => {
            return;
        })
        .catch(e => alert(e.message))
    }

    function saveToken(){
        return firebase.auth().currentUser.getIdToken(true)
            .then(function(idToken) {
            return idToken;
        }).catch(function(error) {
            alert(error.message);
        });
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            let currentUser;

            if(user){
                currentUser = formatUser(user);
                saveToken()
                .then(idToken => {
                    localStorage.setItem('token', idToken)
                })
            }
            setLoggedInUser(currentUser);
            setLoading(false);
        })

        return unsubscribe;
    },[])
    const value = {
        loggedInUser,logIn,logOut,saveToken
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}