import "bootstrap/dist/css/bootstrap.min.css";
import "firebase/auth";
import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Booking from "./components/Booking/Booking";
import Home from "./components/Home/Home";
import Login from "./components/Login/SignUp";
import NoMatch from "./components/NoMatch/NoMatch";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
    const [loggedInUser, setLoggedInUser] = useState({});
    return (
        <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <PrivateRoute path="/booking/:vehicleType">
                        <Booking />
                    </PrivateRoute>
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
