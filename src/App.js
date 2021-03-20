import "bootstrap/dist/css/bootstrap.min.css";
import "firebase/auth";
import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Booking from "./components/Booking/Booking";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NoMatch from "./components/NoMatch/NoMatch";

export const UserContext = createContext();

function App() {
    const [loggedInUser, setLoggedInUser] = useState({});
    return (
        // <div className="container">
        <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
            {/* <p>Name: {loggedInUser.name}</p> */}
            <Router>
                <Header />

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
                    <Route path="/booking/:vehicleType">
                        <Booking />
                    </Route>
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </Router>
        </UserContext.Provider>
        // </div>
    );
}

export default App;
