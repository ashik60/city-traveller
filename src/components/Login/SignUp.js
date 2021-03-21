import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "firebase/app";
import _ from "lodash/fp";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import Header from "../Header/Header";
import firebaseConfig from "./firebase.config";
import "./SignUp.css";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const AuthContext = createContext();
export const AuthProvider = (props) => {
    const auth = Auth();
    return <AuthContext.Provider value={auth}> {props.children} </AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);

const Auth = () => {
    const [user, setUser] = useState(null);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                const currUser = user;
                setUser(currUser);
            }
        });
    }, []);

    const signIn = (email, password) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result);

                setUser(result.user);
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName || email, email };
                setLoggedInUser(signedInUser);
                setUser("sigennnnnnn", signedInUser);

                window.history.back();
            })
            .catch((err) => setUser({ error: err.message }));
    };

    const signUp = (email, password, name) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase
                    .auth()
                    .currentUser.updateProfile({
                        displayName: name,
                    })
                    .then(() => {
                        setUser(result.user);
                        console.log(result);

                        const { email } = result.user;
                        const signedInUser = { name: email, email };
                        setLoggedInUser(signedInUser);
                        window.history.back();
                    });
            })
            .catch((err) => setUser({ error: err.message }));
    };

    return {
        user,
        signIn,
        signUp,
    };
};

// ===========================//
// ========Sign Up============//
//===========================//
const Login = () => {
    const [returningUser, setReturningUser] = useState(false);
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    const handleSignIn = (provider) => {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email };
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch((error) => {
                var errorMessage = error.message;
                console.log("ERROR:", errorMessage);
            });
    };

    const auth = Auth();
    // const [ user, signIn, signUp ] = auth;
    // console.log("auth", auth);
    const onSubmit = (data) => {
        if (returningUser) {
            if (data.email && data.password) {
                auth.signIn(data.email, data.password);
            }
        } else {
            if (data.name && data.email && data.password && data.confirm_password) {
                auth.signUp(data.email, data.confirm_password);
            }
        }
    };

    return (
        <div className="">
            <Header />
            <div className="sign-up">
                <div className="container">
                    {returningUser ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="">
                            {auth.user != null && <p className="text-danger">{auth.user.error}</p>}
                            <div className="form-group">
                                <input
                                    name="email"
                                    className="form-control"
                                    ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
                                    placeholder="Email"
                                />
                                {_.get("email.type", errors) === "required" && (
                                    <p>This field is required</p>
                                )}
                                {_.get("email.type", errors) === "pattern" && (
                                    <p>Alphabetical characters only</p>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    ref={register({ required: true })}
                                    placeholder="Password"
                                />
                                {errors.password && (
                                    <span className="error">Password is required</span>
                                )}
                            </div>

                            <div className="form-group">
                                <button className="btn btn-danger btn-block" type="submit">
                                    Sign In
                                </button>
                            </div>
                            <div className="option text-center">
                                <label onClick={() => setReturningUser(false)}>
                                    Create a new Account
                                </label>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="py-5">
                            {auth.user != null && <p className="text-danger">{auth.user.error}</p>}
                            <div className="form-group">
                                <input
                                    name="name"
                                    className="form-control"
                                    ref={register({ required: true })}
                                    placeholder="Name"
                                />
                                {errors.name && <span className="error">Name is required</span>}
                            </div>
                            <div className="form-group">
                                <input
                                    name="email"
                                    className="form-control"
                                    ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })}
                                    placeholder="Email"
                                />
                                {_.get("email.type", errors) === "required" && (
                                    <p>Email is required</p>
                                )}
                                {_.get("email.type", errors) === "pattern" && <p>Invalid Email</p>}
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    ref={register({ required: true })}
                                    placeholder="Password"
                                />
                                {errors.password && (
                                    <span className="error">Password is required</span>
                                )}
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="confirm_password"
                                    className="form-control"
                                    ref={register({
                                        validate: (value) => value === watch("password"),
                                    })}
                                    placeholder="Confirm Password"
                                />
                                {errors.confirm_password && (
                                    <span className="error">Passwords don't match.</span>
                                )}
                            </div>
                            <div className="form-group">
                                <button className="btn btn-info btn-block" type="submit">
                                    Sign Up
                                </button>
                            </div>
                            <div className="option text-center">
                                <label onClick={() => setReturningUser(true)}>
                                    Already Have an Account? Login Here
                                </label>
                            </div>
                        </form>
                    )}
                </div>
                <div className="container provider-login">
                    <h5 className="or">
                        <span>Or</span>
                    </h5>
                    <h1
                        className="btn btn-block btn-outline-primary"
                        onClick={() => handleSignIn(googleProvider)}
                    >
                        <FontAwesomeIcon icon={faGoogle} /> Sign in using Google
                    </h1>
                    <br />
                    <h1
                        onClick={() => handleSignIn(fbProvider)}
                        className="btn btn-block btn-outline-primary"
                    >
                        <FontAwesomeIcon icon={faFacebook} /> Sign in using Facebook
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Login;
