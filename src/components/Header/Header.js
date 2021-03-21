import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    return (
        <div>
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 ">
                <h5 className="my-0 mr-md-auto h2  font-weight-normal">City Travellers</h5>
                <nav className="my-2 my-md-0 mr-md-3">
                    <Link to="/" className="p-2 text-dark">
                        Home
                    </Link>
                    <Link to="/booking/car" className="p-2 text-dark">
                        Destination
                    </Link>
                    <Link to="/" className="p-2 text-dark">
                        Blog
                    </Link>
                    <Link to="/" className="p-2 text-dark">
                        Contact
                    </Link>
                </nav>

                <Link to="/login" className="btn btn-outline-primary">
                    {loggedInUser.name || "Login"}
                </Link>
            </div>
        </div>
    );
};

export default Header;
