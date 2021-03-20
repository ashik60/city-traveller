import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext } from "react";
import UserContext from "../../App";
import firebaseConfig from "./firebase.config";

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    var fbProvider = new firebase.auth.FacebookAuthProvider();

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    const handleSignIn = (provider) => {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email };
                setLoggedInUser(signedInUser);
            })
            .catch((error) => {
                var errorMessage = error.message;
                console.log("ERROR:", errorMessage);
            });
    };

    return (
        <div>
            <h1 className="btn btn-outline-primary" onClick={() => handleSignIn(googleProvider)}>
                Sign in using Google
            </h1>
            <h1 className="btn btn-outline-primary" onClick={() => handleSignIn(fbProvider)}>
                Sign in using Facebook
            </h1>
        </div>
    );
};

export default Login;
